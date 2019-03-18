/* eslint no-process-env:0 */

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    useMongoClient: true,
    uri: 'mongodb://localhost/setup-test',
  },
  port: '9001',
};
