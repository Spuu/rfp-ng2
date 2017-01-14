var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var StoreSchema = new Schema({
    name        : { type: String, required: true, unique: true, dropDups: true },
    long_name   : String
});

module.exports = mongoose.model('Store', StoreSchema);