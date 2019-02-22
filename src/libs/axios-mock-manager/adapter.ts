/**
 * Based on https://github.com/topheman/npm-registry-browser/blob/master/src/services/apis/httpClientMock.js
 */

import MockAdapter from "axios-mock-adapter";
import { AxiosInstance } from "axios";
import { AxiosMockManagerMockData, MATCH_DELIMITER } from ".";

const ucFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export type AxiosMockManagerPreprocessMock = (
  mock: AxiosMockManagerMockData
) => AxiosMockManagerMockData;

export type AxiosMockManagerMakeMockedClient = (
  makeAxiosClient: () => AxiosInstance,
  mocks: AxiosMockManagerMockData[],
  {
    preprocessMock,
    key
  }: { preprocessMock: AxiosMockManagerPreprocessMock; key: string }
) => any;

export const makeMockedClient: AxiosMockManagerMakeMockedClient = (
  makeAxiosClient,
  mocks,
  {
    preprocessMock = m => m,
    key
  }: {
    preprocessMock: (m: AxiosMockManagerMockData) => AxiosMockManagerMockData;
    key: string;
  }
) => {
  const mockedAxiosClient = new MockAdapter(makeAxiosClient());
  const originalAxiosClient = makeAxiosClient();
  const preprocessedMocks = mocks.map(mock => preprocessMock(mock));
  preprocessedMocks.forEach(mock => {
    const [method, url, rawParams, rawHeaders] = mock.match.split(
      MATCH_DELIMITER
    );
    const params = JSON.parse(rawParams);
    const headers = JSON.parse(rawHeaders);
    let options: any | undefined = {};
    if (Object.getOwnPropertyNames(params).length) {
      options.params = params;
    }
    if (Object.getOwnPropertyNames(headers).length) {
      options.headers = headers;
    }
    if (!Object.getOwnPropertyNames(options).length) {
      options = undefined;
    }
    console.log(`Mocking ${url}`);
    (mockedAxiosClient as any)
      [`on${ucFirst(method)}`](url, options)
      .reply(() => {
        let preprocessedMocked = mock;
        if (preprocessMock) {
          preprocessedMocked = preprocessMock(mock);
        }
        const result = [
          preprocessedMocked.status,
          preprocessedMocked.res.data,
          preprocessedMocked.res.headers
        ];
        console.log(
          `[Mock][mocking](${key}) ${preprocessedMocked.url}?${JSON.stringify(
            preprocessedMocked.req.params
          )}|${JSON.stringify(preprocessedMocked.req.headers)}`,
          result
        );
        return result;
      });
  });
  // let unmocked requests passthrough and log them
  mockedAxiosClient.onAny().reply(config =>
    originalAxiosClient.request(config).then(result => {
      const output = [result.status, result.data, result.headers];
      console.log(`[Mock][passThrough](${key}) ${config.url}`, output);
      return output;
    })
  );
  return (mockedAxiosClient as any).axiosInstance;
};
