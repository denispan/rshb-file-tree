const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/jest.silent.js"
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  verbose: false,
  silent: false,
  noStackTrace: true,
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/e2e/"
  ],
};

module.exports = createJestConfig(customJestConfig);
