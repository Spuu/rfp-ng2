var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var StoreSchema = new Schema({
    name : { type: String, required: true }
});

StoreSchema.methods.setObject = function (obj) {
    this.name = obj.name;
};

module.exports = mongoose.model('Store', StoreSchema);