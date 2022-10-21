module.exports = {
    transformIgnorePatterns: ["node_modules/(?!\@?axios)"],
    "moduleNameMapper": {
        "\\.(css)$": "<rootDir>/cssStub.js"
    }
}
{
    testEnvironment: 'jest-environment-jsdom-fifteen'
}
