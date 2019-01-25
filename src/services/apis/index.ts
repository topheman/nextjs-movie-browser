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

const config: ApiManagerConfig = {
  [TARGET_API_TMDB_API]: {
    httpClientBaseConfig: {
      timeout: Number(process.env.NEXTJS_APP_CLIENT_TMDB_API_TIMEOUT),
      baseURL: process.env.NEXTJS_APP_CLIENT_TMDB_API_ROOT_URL
    },
    managerConfig: {
      decorateApi: decorateTmdbApi,
      isCacheEnabled:
        process.env.NEXTJS_APP_CLIENT_TMDB_API_CACHE_ENABLED === "true",
      // TODO add mock support
      mocks: undefined,
      makeMockedClient: undefined,
      preprocessMocking: undefined
    }
  }
};

export const init = () => configure(config);

type IApiTmdb = ApiManagerManager & TmdbDecorateAPI;

export const apiTmdb = (): IApiTmdb =>
  <IApiTmdb>getInstance(TARGET_API_TMDB_API);
