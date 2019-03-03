/**
 * Port to TypeScript of
 * https://github.com/topheman/npm-registry-browser/blob/master/src/services/apis/index.js
 */
import {
  configure,
  getInstance,
  ApiManagerConfig
} from "../../libs/apis-manager";
import decorateTmdbApi, { TmdbDecorateAPI } from "./decorateApis/tmdb";
import { TARGET_API_TMDB_API } from "./constants";
import { ApiManagerManager } from "../../libs/apis-manager/Manager";
import { AxiosMockManagerPreprocessMock } from "../../libs/axios-mock-manager/adapter";
import { AxiosMockManagerMockData } from "../../libs/axios-mock-manager";
let makeMockedClient;
let mocks;
let preprocessMock: AxiosMockManagerPreprocessMock;

// only load mocked client and mocks if in mock mode
if (process.env.MOCKS_ENABLED === "true") {
  console.log("Loading mocks");
  makeMockedClient = require("../../libs/axios-mock-manager/adapter")
    .makeMockedClient;
  mocks = require("./__mocks__/tmdb/e2e.simple.fixtures.json");
  preprocessMock = mock => {
    return {
      ...mock,
      match: mock.match.replace("$API_KEY", process.env
        .NEXTJS_APP_CLIENT_TMDB_API_KEY as string),
      req: {
        ...mock.req,
        params: {
          ...mock.req.params,
          api_key: process.env.NEXTJS_APP_CLIENT_TMDB_API_KEY
        }
      }
    };
  };
  console.log(
    typeof window !== "undefined"
      ? mocks
      : mocks.map((mock: AxiosMockManagerMockData) => mock.match) // avoid poluting logs server-side
  );
}

const config: ApiManagerConfig = {
  [TARGET_API_TMDB_API]: {
    httpClientBaseConfig: {
      timeout: Number(process.env.NEXTJS_APP_CLIENT_TMDB_API_TIMEOUT),
      baseURL: process.env.NEXTJS_APP_CLIENT_TMDB_API_ROOT_URL
    },
    managerConfig: {
      decorateApi: decorateTmdbApi,
      mocks,
      makeMockedClient,
      // @ts-ignore - 'preprocessMock' is used before being assigned - but it's not ...
      preprocessMock: preprocessMock
    }
  }
};

/**
 * Init the ApiManager before using it
 * You can alter the config by passing a callback
 *
 * @param fn @optional (config) => alteredConfig
 */
export const init = (fn?: (config: ApiManagerConfig) => ApiManagerConfig) => {
  if (typeof fn === "function") {
    const alteredConfig: ApiManagerConfig = fn(config);
    return configure(alteredConfig);
  }
  return configure(config);
};

type IApiTmdb = ApiManagerManager & TmdbDecorateAPI;

export const apiTmdb = (): IApiTmdb =>
  getInstance(TARGET_API_TMDB_API) as IApiTmdb;
