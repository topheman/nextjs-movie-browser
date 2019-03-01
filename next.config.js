"use strict";

const withTypescript = require("@zeit/next-typescript");
const webpack = require("webpack");

const { loadConfig } = require("./scripts/config/next-env");

// to avoid EnvironmentPlugin warning, assign "false" when undefined
process.env.RECORD_MOCKS =
  process.env.RECORD_MOCKS === "true" ? process.env.RECORD_MOCKS : "false";
process.env.MOCKS_ENABLED =
  process.env.MOCKS_ENABLED === "true" ? process.env.MOCKS_ENABLED : "false";

const { getBanner, getInfos } = require("./common");
const moreInfos = process.env.HEROKU_RELEASE_CREATED_AT
  ? [`Released on server at ${process.env.HEROKU_RELEASE_CREATED_AT}`]
  : [];
process.env.NEXTJS_APP_CLIENT_BANNER_HTML = getBanner(
  "formatted",
  process.env.MOCKS_ENABLED === "true"
    ? moreInfos.concat(["This is a mocked version", ""])
    : moreInfos
);
process.env.NEXTJS_APP_CLIENT_METADATAS_VERSION = getInfos().pkg.version;
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
