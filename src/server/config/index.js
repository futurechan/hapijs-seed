

var environment = process.env.NODE_ENV || 'development';

var config = require('./config');
config.db = require('./db')[environment];

module.exports = config;
