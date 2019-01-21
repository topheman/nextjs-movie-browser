const { loadConfig } = require("./env");

/**
 * Loads .env files in dotEnvConfigPath into process.env according to https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
 * Your env vars must start with: NEXTJS_APP_CLIENT_ / NEXTJS_APP_SERVER_
 * @param {String} dotEnvConfigPath
 * @param {String} NODE_ENV
 */
module.exports.loadConfig = function(
  dotEnvConfigPath = process.cwd(),
  NODE_ENV = process.env.NODE_ENV
) {
  const CLIENT_PREFIX = "NEXTJS_APP_CLIENT_";
  const SERVER_PREFIX = "NEXTJS_APP_SERVER_";
  const { raw } = loadConfig(
    [CLIENT_PREFIX, SERVER_PREFIX],
    dotEnvConfigPath,
    NODE_ENV
  );
  const config = Object.keys(raw).reduce(
    (acc, key) => {
      if (key.startsWith(CLIENT_PREFIX)) {
        acc.client[key] = raw[key];
        return acc;
      }
      if (key.startsWith(SERVER_PREFIX)) {
        acc.server[key] = raw[key];
        return acc;
      }
      return acc;
    },
    {
      client: {},
      server: {}
    }
  );
  return config;
};
