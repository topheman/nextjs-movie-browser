"use strict";

const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  setupTestFrameworkScriptFile: "<rootDir>/src/setupTests.js",
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/"
  ],
  moduleFileExtensions: ["tsx", "ts", "jsx", "js"],
  collectCoverage: true
};
