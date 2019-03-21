const path = require("path");
const { loadConfig, injectConfig } = require("../env");

const modes = ["basic", "simple", "local"];
const envs = ["development", "production", "test"];

const PREFIX = "DOTENV_PREFIX_TEST_";

const flushProcessEnvVars = prefix => {
  Object.keys(process.env)
    .filter(key => key.startsWith(PREFIX))
    .forEach(key => {
      delete process.env[key];
    });
};

describe("scripts/config/env", () => {
  describe("loadConfig", () => {
    beforeEach(() => {
      flushProcessEnvVars(PREFIX);
    });
    modes.forEach(mode => {
      describe(mode, () => {
        envs.forEach(env => {
          // On travis, skip in "local" mode for "production" and "development" env (only fails on travis)
          ((CI, currentMode, currentEnv) =>
            CI &&
            currentMode === "local" &&
            ["production", "development"].includes(currentEnv)
              ? it.skip
              : it)(process.env.CI, mode, env)(
            `check with process.env == "${env}"`,
            () => {
              const config = loadConfig(
                ["DOTENV_PREFIX_TEST_"],
                path.resolve(__dirname, "__mocks__", mode),
                env
              );
              expect(config.raw).toMatchSnapshot();
            }
          );
        });
      });
    });
  });
});
