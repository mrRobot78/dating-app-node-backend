/* eslint-disable global-require */
/* eslint no-process-env:0 */

// Set default node environment to development
const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  // Register the Babel require hook
  require('babel-register');
}

// Export the application
module.exports = require('./app');
exports = require('./app');
