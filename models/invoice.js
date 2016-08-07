var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var InvoiceSchema   = new Schema({

    _cpty           : { type: Schema.ObjectId, ref: 'Cpty', required: true },
    creation_date    : { type: Date, default: Date.now },
    document_date    : { type: Date, default: Date.now },
    name            : { type: String, required: true },
    last_modif_date   : { type: Date, default: Date.now },
    _store          : { type: Schema.ObjectId, ref: 'Store', required: true },
    type            : { type: String, enum: ['Buy', 'Sell'], default: 'Buy' }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);