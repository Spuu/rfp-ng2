var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var CptySchema = new Schema({
    name        : { type: String, required: true, unique: true, dropDups: true },
    long_name   : String
});

module.exports = mongoose.model('Cpty', CptySchema);