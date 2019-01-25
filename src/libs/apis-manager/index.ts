/**
 * Port to TypeScript of
 * https://github.com/topheman/npm-registry-browser/blob/master/src/services/apis/apiManager.js
 */

/**
 * You may create a module where you declare your config and export configure(config)
 * like it's done in ./index.js to separate implementation from configuration
 * And never directly call methods in here from the rest of your project.
 */

import Manager, { ApiManagerOptions, ApiManagerManager } from "./Manager";

// the following variables are inititlized with configure(config)

export interface ApiManagerConfig {
  [key: string]: ApiManagerOptions;
}

/**
 * Cache the config passed through configure(config)
 */
let baseConfig: ApiManagerConfig;

let acceptedKeys: string[] = [];

/**
 * Cache the instances of the multiton
 * Hashmap: - initialized with configure(config)
 *          - populated when you call getInstance(key)
 */
const instances: { [key: string]: Manager } = {};

/**
 * You must first configure the multiton
 * @param {Object} config
 * @return {Object}
 */
export const configure = (config: ApiManagerConfig) => {
  if (baseConfig) {
    console.warn("[apiManager][configure] Already configured");
    return baseConfig;
  }
  acceptedKeys = Object.keys(config);
  acceptedKeys.forEach(key => {
    // @ts-ignore
    instances[key] = null;
  });
  baseConfig = config;
  return baseConfig;
};

/**
 * Once you configured the multiton, you can retrieve the same instance
 * of each of your apis through this utility
 *
 * @param {Object} key
 * @return {Object}
 */
export const getInstance = (key: string): ApiManagerManager => {
  if (!baseConfig) {
    console.log(baseConfig);
    throw new Error(
      `[apiManager] You must call .configure(config) before calling .getInstance(${key})`
    );
  }
  if (baseConfig && !baseConfig[key]) {
    throw new Error(
      `[apiManager](${key}) .getInstance(key) only accepts: ${acceptedKeys.join(
        ", "
      )}`
    );
  }
  // ensure return the same instance all the time (only create a new one the first time)
  if (!instances[key]) {
    instances[key] = new Manager(baseConfig[key], key);
  }
  return instances[key];
};
