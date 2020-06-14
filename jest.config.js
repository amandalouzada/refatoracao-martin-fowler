module.exports = {
    bail: 1,
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['./**/*.ts'],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],
    coverageReporters: [
        "text",
        "lcov"
    ],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
};