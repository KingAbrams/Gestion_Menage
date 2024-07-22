import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  verbose: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["src/config/index.ts", "src/config/logger.ts"],
  collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
