/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverage: true,
};