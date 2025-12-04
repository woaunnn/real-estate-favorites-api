module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/data/**',
    ],
    testMatch: [
        '**/__tests__/**/*.test.js',
    ],
    verbose: true,
};
