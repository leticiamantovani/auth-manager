import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  extensionsToTreatAsEsm: [".ts"], // Ensures TypeScript files are treated as ESM
  globals: {
    "ts-jest": {
      useESM: true, // Enables ES module support
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Fixes import path issues in ESM
  },
};

export default config;
