import type { Config } from "jest";

const config: Config = {
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/mocks/singleton.ts"],
};

export default config;
