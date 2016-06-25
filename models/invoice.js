var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Counterparty = require('counterparty');
var Store        = require('store');

var InvoiceSchema   = new Schema({

    counterparty    : [{ type: ObjectId, ref: 'Counterparty' }],
    creationDate    : { type: Date, default: Date.now },
    documentDate    : { type: Date, default: Date.now },
    name            : String,
    store           : [{ type: ObjectId, ref: 'Store' }],
    type            : {type: String, enum: ['Buy', 'Sell']}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);