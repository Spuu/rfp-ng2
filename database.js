var mongoose = require('mongoose');
var config = require('./config');

var mongourl = process.env.MONGODB_URI || config.mongo_url;
module.exports = mongoose.connect(mongourl);
