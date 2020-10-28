module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/UsersController.js', 'src/**/GroupsController.js'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80
        }
    }
};
