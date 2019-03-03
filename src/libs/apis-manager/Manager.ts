/**
 * Port to TypeScript of
 * https://github.com/topheman/npm-registry-browser/blob/master/src/services/apis/Manager.js
 */

import invariant from "invariant";

import { makeClient } from "./http-client";
import { AxiosInstance, AxiosRequestConfig } from "axios";

import { AxiosMockManagerPreprocessMock } from "../axios-mock-manager/adapter";

export interface ApiManagerOptions {
  managerConfig: {
    decorateApi: ({
      client,
      key
    }: {
      client: AxiosInstance;
      key: string;
    }) => any;
    mocks?: [];
    makeMockedClient: any;
    preprocessMock: AxiosMockManagerPreprocessMock;
  };
  httpClientBaseConfig?: AxiosRequestConfig;
}

export type ApiManagerManager = Manager & { [key: string]: any };

/**
 * This class is NEVER called directly.
 *
 * Use apiManager.configure(config) with the same params as this constructor.
 *
 * @param {Object} [options.managerConfig]
 * @param {Function} [options.managerConfig.decorateApi] add custom methods: ({client, key}) => { ...apis}
 * @param {Array} [options.managerConfig.mocks] Only passed if mock mode is on - The mocks to be used
 * @param {Function} [options.managerConfig.makeMockedClient] Only passed if mock mode is on - The mockClient Factory
 * @param {String} key Identify WHich api you're on
 *
 * @param {Object} [options.httpClientBaseConfig] Config you would pass to your http client (axios here)
 */
export default class Manager {
  key: string;
  client: AxiosInstance;
  constructor(
    { managerConfig, httpClientBaseConfig = {} }: ApiManagerOptions,
    key: string
  ) {
    const {
      decorateApi, // ({client, key}) => { ...apis}
      mocks,
      makeMockedClient,
      preprocessMock
    } = managerConfig;
    invariant(
      typeof key !== "undefined",
      "[Api][Manager] key param must be specified (any string will do)"
    );
    const axiosConfig: AxiosRequestConfig = { ...httpClientBaseConfig }; // don't mutate arguments
    this.key = key;
    if (mocks && makeMockedClient) {
      console.warn(
        `[Api][Manager](${
          this.key
        }) Mocking API. Requests will be intercepted and served. The files containing the mocks are in src/services/apis/mocks. To generate those files, run: RECORD_MOCKS=true npm run dev (then open the devtools console).`
      );
      console.warn(
        `[Api][Manager](${
          this.key
        }) Unmocked requests will pass through and will be logged.`
      );
      this.client = makeMockedClient(() => makeClient(axiosConfig), mocks, {
        preprocessMock,
        key: this.key
      });
    } else {
      this.client = makeClient(axiosConfig);
    }
    // add custom method to the Api via decorateApi
    if (typeof decorateApi === "function") {
      const moreApis = decorateApi({
        client: this.client,
        key: this.key
      });
      const reservedAttributes = Object.keys(this);
      invariant(
        !Object.keys(moreApis).some(arrayKey =>
          reservedAttributes.includes(arrayKey)
        ),
        `[Api][Manager](${
          this.key
        }) decorateApi can not return one of the following reserved attributes: ${reservedAttributes.join(
          ", "
        )}`
      );
      Object.assign(this, moreApis);
    }
  }
}
