const withTypescript = require("@zeit/next-typescript");
const webpack = require("webpack");

const { loadConfig } = require("./scripts/config/next-env");

// load .env config + inject it in process.env
const envConfig = loadConfig();

module.exports = withTypescript({
  webpack: (config, options) => {
    // only expose the client env vars (starting with `NEXTJS_APP_CLIENT_`)
    // other vars declared in .env are accessible in process.env (starting with `NEXTJS_APP_SERVER_`)
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        ...envConfig.client,
        RECORD_MOCKS: process.env.RECORD_MOCKS,
        MOCKS_ENABLED: process.env.MOCKS_ENABLED
      })
    );
    return config;
  }
});
