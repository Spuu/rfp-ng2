var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Cpty         = require('./cpty');
var Store        = require('./store');

var InvoiceSchema   = new Schema({

    cpty            : [{ type: Schema.ObjectId, ref: 'Cpty' }],
    creationDate    : { type: Date, default: Date.now },
    documentDate    : { type: Date, default: Date.now },
    name            : { type: String, required: true },
    store           : [{ type: Schema.ObjectId, ref: 'Store', required: true }],
    type            : {type: String, enum: ['Buy', 'Sell'], required: true }
});

InvoiceSchema.methods.setObject = function (obj) {

    this.cpty           = obj.cpty;
    this.creationDate   = obj.creationDate;
    this.documentDate   = obj.documentDate;
    this.name           = obj.name;
    this.store          = obj.store;
    this.type           = obj.type;
};

module.exports = mongoose.model('Invoice', InvoiceSchema);