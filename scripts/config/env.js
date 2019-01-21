/**
 * Inspired by https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/env.js
 */

const fs = require("fs");
const path = require("path");

/**
 * Loads .env files in dotEnvConfigPath into process.env according to https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
 * Returns env vars loaded, filtered with `envVarNameFilter`
 *
 * @param {String} dotEnvConfigPath
 * @param {String} NODE_ENV
 * @param {Array[String|RegExp]} envVarNameFilter
 */
function loadConfig(
  envVarNameFilter = [/^WEB_APP_/i],
  dotEnvConfigPath = process.cwd(),
  NODE_ENV = process.env.NODE_ENV
) {
  if (!NODE_ENV) {
    throw new Error(
      "The NODE_ENV environment variable is required but was not specified."
    );
  }
  if (
    !envVarNameFilter ||
    (envVarNameFilter && envVarNameFilter.length === 0)
  ) {
    throw new Error("Third argument must be an array");
  }

  const dotEnvPath = path.resolve(dotEnvConfigPath, ".env");

  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  const dotenvFiles = [
    `${dotEnvPath}.${NODE_ENV}.local`,
    `${dotEnvPath}.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== "test" && `${dotEnvPath}.local`,
    dotEnvPath
  ].filter(Boolean);

  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require("dotenv-expand")(
        require("dotenv").config({
          path: dotenvFile
        })
      );
    }
  });

  const raw = Object.keys(process.env)
    .filter(key => filterEnvVarName(key, envVarNameFilter))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      { NODE_ENV }
    );

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return { raw, stringified };
}

function filterEnvVarName(key, envVarNameFilter) {
  for (const filter of envVarNameFilter) {
    if (typeof filter === "string") {
      return key.startsWith(filter);
    }
    if (filter instanceof RegExp) {
      return filter.test(key);
    }
    return false;
  }
}

module.exports = {
  loadConfig
};
