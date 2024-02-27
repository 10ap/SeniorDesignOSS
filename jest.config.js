module.exports = {
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,
  
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverage: true,
  
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
  
    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  
    // The test environment that will be used for testing
    testEnvironment: 'jest-environment-jsdom',
    
    // Setup files after the environment is loaded
    setupFilesAfterEnv: ["./src/setupTests.js"], // Replace with the path to your setup file

    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
      }
};
