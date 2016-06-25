var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Invoice     = require('./invoice');
var Store       = require('./store');

var PositionSchema = new Schema({

    buy_netto_price     : {type: Number, default: 0},
    discount            : {type: Number, default: 0},
    ean                 : {type: String, required: true },
    invoice             : [{type: Schema.ObjectId, ref: 'Invoice', required: true }],
    index               : {type: Number, default: 1},
    quantity            : {type: Number, default: 1},
    quantity_rate       : {type: Number, default: 1},
    retail_rate         : {type: Number, default: 1},
    sell_brutto_price   : {type: Number, default: 0},
    store               : [{type: Schema.ObjectId, ref: 'Store', required: true }],
    vat                 : {type: Number, default: 0}
});

PositionSchema.methods.setObject = function (obj) {

    this.buy_netto_price    = obj.buy_netto_price;
    this.discount           = obj.discount;
    this.ean                = obj.ean;
    this.invoice            = obj.invoice;
    this.index              = obj.index;
    this.quantity           = obj.quantity;
    this.quantity_rate      = obj.quantity_rate;
    this.retail_rate        = obj.retail_rate;
    this.sell_brutto_price  = obj.sell_brutto_price;
    this.store              = obj.store;
    this.vat                = obj.vat;
};

module.exports = mongoose.model('Position', PositionSchema);