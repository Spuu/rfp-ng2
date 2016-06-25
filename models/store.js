var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var StoreSchema = new Schema({
    name    : String
});

module.exports = mongoose.model('Store', StoreSchema);