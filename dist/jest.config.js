"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    collectCoverage: false,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '^((?!int|e2e).)*.test.ts$',
    coverageDirectory: '../coverage',
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: 'src',
    transform: {
        "^.+\\.(t|j)s$": ["ts-jest", { isolatedModules: true }],
    },
};
//# sourceMappingURL=jest.config.js.map