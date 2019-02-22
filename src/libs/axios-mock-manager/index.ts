import { AxiosResponse } from "axios";

export const MATCH_DELIMITER = "@@@"; // used to delimit method, url, params and headers in mock.match

export interface AxiosMockManagerMockData {
  match: string;
  status: number;
  url?: string;
  req: { params: any; headers: any; method?: string };
  res: { data: any; headers: any };
}

export const formatMatchKey = (
  response: AxiosResponse,
  {
    params = true,
    headers = false
  }: {
    params: boolean;
    headers: boolean;
  } = {} as any
): string => {
  const interpolatedMethod = response.config.method
    ? response.config.method.toLowerCase()
    : "";
  const interpolatedUrl = response.config.url;
  // params sorted in alpha order of the keys (to match a query string no matter the order of the params)
  const interpolatedParams = params
    ? Object.entries(response.config.params || {})
        .sort(([keyA], [keyB]) => (keyA > keyB ? 1 : -1))
        .reduce((acc, [key, value]) => {
          (acc as any)[key] = value;
          return acc;
        }, {})
    : {};
  // same for headers
  const interpolatedHeaders = headers
    ? Object.entries(response.config.headers || {})
        .sort(([keyA], [keyB]) => (keyA > keyB ? 1 : -1))
        .reduce((acc, [key, value]) => {
          (acc as any)[key] = value;
          return acc;
        }, {})
    : {};
  return `${interpolatedMethod}${MATCH_DELIMITER}${interpolatedUrl}${MATCH_DELIMITER}${JSON.stringify(
    interpolatedParams
  )}${MATCH_DELIMITER}${JSON.stringify(interpolatedHeaders)}`;
};
