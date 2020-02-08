module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "ts", "js"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
    "**/src/**/*.test.(ts|js)",
    "**/src/**/*.spec.(ts|js)",
    "**/test/**/*.test.(ts|js)",
    "**/test/**/*.spec.(ts|js)"
  ],
  testEnvironment: "node"
};
