var mongoose = require('mongoose');
var config = require('./config');

module.exports = mongoose.connect(config.mongo_url);
