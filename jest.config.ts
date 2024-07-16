import type { Config } from "jest";

const config: Config = {
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
