var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var StoreSchema = new Schema({
    name : { type: String, required: true }
});

module.exports = mongoose.model('Store', StoreSchema);