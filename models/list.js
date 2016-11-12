var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ListSchema = new Schema({
    name             : { type: String, required: true, unique: true, dropDups: true },
    creation_date    : { type: Date, default: Date.now },
    document_date    : { type: Date, default: Date.now },
    _store           : { type: Schema.ObjectId, ref: 'Store', required: true },
    type             : { type: String, enum: ['Sold', 'Inventory', 'List'], default: 'List' }
});

module.exports = mongoose.model('List', ListSchema);