const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/node_modules/tailwindcss",
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 91,
      lines: 89,
      statements: 89,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts", // Exclude TypeScript declaration files
    "!app/**/index.{js,ts,tsx}",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
