var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var CptySchema = new Schema({
    name        : { type: String, required: true },
    long_name   : String
});

CptySchema.methods.setObject = function (obj) {
    this.name       = obj.name;
    this.long_name  = obj.long_name;
};

module.exports = mongoose.model('Cpty', CptySchema);