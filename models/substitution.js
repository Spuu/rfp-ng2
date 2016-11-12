var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var SubstitutionSchema = new Schema({
    name        : { type: String, required: true, unique: true, dropDups: true },
    creation_date    : { type: Date, default: Date.now },
    document_date    : { type: Date, default: Date.now },
    quantity         : { type: Number, default: 0 },
    _store_src       : { type: Schema.ObjectId, ref: 'Store', required: true },
    _store_dst       : { type: Schema.ObjectId, ref: 'Store', required: true },
    _product_src     : { type: Schema.ObjectId, ref: 'Product', required: true },
    _product_dst     : { type: Schema.ObjectId, ref: 'Product', required: true }
});

module.exports = mongoose.model('Substitution', SubstitutionSchema);