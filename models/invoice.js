var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Cpty         = require('./cpty');
var Store        = require('./store');

var InvoiceSchema   = new Schema({

    _cpty           : { type: Schema.ObjectId, ref: 'Cpty', required: true },
    creationDate    : { type: Date, default: Date.now },
    documentDate    : { type: Date, default: Date.now },
    name            : { type: String, required: true },
    lastModifDate   : { type: Date, default: Date.now },
    _store          : { type: Schema.ObjectId, ref: 'Store', required: true },
    type            : { type: String, enum: ['Buy', 'Sell'], default: 'Buy' }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);