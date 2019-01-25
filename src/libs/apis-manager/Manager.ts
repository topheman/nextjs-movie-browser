/**
 * Port to TypeScript of
 * https://github.com/topheman/npm-registry-browser/blob/master/src/services/apis/Manager.js
 */

//@ts-ignore
import { setupCache } from "axios-cache-adapter";
import invariant from "invariant";

import { makeClient } from "./http-client";
import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiManagerOptions {
  managerConfig: {
    decorateApi: ({
      client,
      key,
      cache
    }: {
      client: AxiosInstance;
      key: string;
      cache?: any;
    }) => any;
    isCacheEnabled: boolean;
    // TODO manage mock options
    mocks?: any;
    makeMockedClient?: any;
    preprocessMocking?: any;
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
 * @param {String} [options.managerConfig.key]
 * @param {Function} [options.managerConfig.decorateApi] add custom methods: ({client, cache, key}) => { ...apis}
 * @param {Boolean} [options.manager.isCacheEnabled]
 * @param {Array} [options.managerConfig.mocks] Only passed if mock mode is on - The mocks to be used
 * @param {Function} [options.managerConfig.makeMockedClient] Only passed if mock mode is on - The mockClient Factory
 * @param {Function} [options.managerConfig.preprocessMocking] Only passed if mock mode is on - allow you to rewrite the response per-request ([status, response, headers], config) -> [status, response, headers]
 *
 * @param {Object} [options.httpClientBaseConfig] Config you would pass to your http client (axios here)
 */
export default class Manager {
  key: string;
  client: AxiosInstance;
  cache?: any;
  constructor(
    { managerConfig, httpClientBaseConfig = {} }: ApiManagerOptions,
    key: string
  ) {
    const {
      decorateApi, // ({client, cache, key}) => { ...apis}
      isCacheEnabled,
      mocks,
      makeMockedClient,
      preprocessMocking
    } = managerConfig;
    invariant(
      typeof key !== "undefined",
      "[Api][Manager] key param must be specified (any string will do)"
    );
    const axiosConfig: AxiosRequestConfig = { ...httpClientBaseConfig }; // don't mutate arguments
    this.key = key;
    if (isCacheEnabled) {
      this.cache = setupCache({ maxAge: 15 * 60 * 1000 });
      axiosConfig.adapter = this.cache.adapter;
      if (process.env.NODE_ENV === "development") {
        console.info(
          `[Api][Manager](${this.key}) Cache is enabled`,
          this.cache
        );
      }
    }
    if (mocks) {
      console.warn(
        `[Api][Manager](${
          this.key
        }) Mocking API. Requests will be intercepted and served. The files containing the mocks are in src/services/mocks. To generate those files, run: npm run record-http-mocks.`
      );
      console.warn(
        `[Api][Manager](${
          this.key
        }) Unmocked requests will pass through and will be logged.`
      );
      this.client = makeMockedClient(
        axiosConfig,
        mocks,
        {
          preprocessMocking
        },
        this.key
      );
    } else {
      this.client = makeClient(axiosConfig);
    }
    // add custom method to the Api via decorateApi
    if (typeof decorateApi === "function") {
      const moreApis = decorateApi({
        client: this.client,
        key: this.key,
        cache: this.cache
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
