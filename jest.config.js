module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
