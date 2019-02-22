import { AxiosInstance, AxiosResponse } from "axios";

import { formatMatchKey, AxiosMockManagerMockData } from ".";

const AXIOS_RECORDER_LOCALSTORAGE_KEY = "AXIOS_RECORDER_MOCK_DATA";

export type AxiosMockManagerProcessResponseBeforeSave = (
  response: AxiosResponse
) => AxiosMockManagerMockData;

export type AxiosMockManagerFilterResponse = (
  response: AxiosResponse
) => boolean;

export type AxiosMockManagerSetupRecorder = (
  axiosInstance: AxiosInstance,
  options?: AxiosMockManagerSetupRecorderOptions
) => {
  init: () => void;
  all: () => Map<string, any>;
  allFormatted: () => string;
  toJSON: () => string;
  reset: () => void;
};

interface AxiosMockManagerSetupRecorderOptions {
  initialState?: Map<string, any>;
  filter?: AxiosMockManagerFilterResponse;
  processResponse?: AxiosMockManagerProcessResponseBeforeSave;
  localStorageKey?: string;
}

export const filterResponse: AxiosMockManagerFilterResponse = response => {
  // only record GET request by default
  if (
    response.config.method &&
    ["get"].includes(response.config.method.toLowerCase())
  ) {
    return true;
  }
  return false;
};

export const processResponseBeforeSave: AxiosMockManagerProcessResponseBeforeSave = response => {
  return {
    match: formatMatchKey(response),
    status: response.status,
    url: response.config.url,
    req: {
      params: response.config.params,
      headers: response.config.headers,
      method: response.config.method && response.config.method.toLowerCase()
    },
    res: {
      data: response.data,
      headers: response.headers
    }
  };
};

export const setupRecorder: AxiosMockManagerSetupRecorder = (
  axiosInstance: AxiosInstance,
  {
    localStorageKey = AXIOS_RECORDER_LOCALSTORAGE_KEY,
    initialState: map = (isBrowser => {
      if (!isBrowser) {
        return new Map();
      }
      let previousRecordedMocks;
      try {
        previousRecordedMocks = localStorage.getItem(localStorageKey);
        if (previousRecordedMocks) {
          previousRecordedMocks = JSON.parse(previousRecordedMocks);
        }
      } catch {
        previousRecordedMocks = undefined;
      }
      return new Map(previousRecordedMocks);
    })(typeof window !== "undefined"),
    filter = filterResponse,
    processResponse = processResponseBeforeSave
  }: AxiosMockManagerSetupRecorderOptions = {} as any
) => {
  axiosInstance.interceptors.response.use(
    response => {
      if (filter(response)) {
        const mock = processResponse(response);
        if (mock.match) {
          console.log("mock.record", mock.match);
          map.set(mock.match, mock);
        }
      }
      return response;
    },
    error => {
      console.log("response.error", error);
      return Promise.reject(error);
    }
  );
  return {
    all: () => map,
    allFormatted: () => JSON.stringify([...map.values()]),
    toJSON: () => JSON.stringify(map),
    reset: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(AXIOS_RECORDER_LOCALSTORAGE_KEY);
      }
      map.clear();
    },
    init: () => {
      if (typeof window !== "undefined") {
        window.addEventListener(
          "beforeunload",
          () => {
            localStorage.setItem(
              AXIOS_RECORDER_LOCALSTORAGE_KEY,
              JSON.stringify(map)
            );
          },
          false
        );
      }
    }
  };
};
