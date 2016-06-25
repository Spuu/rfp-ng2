var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Invoice     = require('invoice');
var Store       = require('store');

var PositionSchema = new Schema({

    buy_netto_price     : {type: Number, default: 0},
    discount            : {type: Number, default: 0},
    ean                 : String,
    invoice             : [{type: ObjectId, ref: 'Invoice'}],
    index               : {type: Number, default: 1},
    quantity            : {type: Number, default: 1},
    quantity_rate       : {type: Number, default: 1},
    retail_rate         : {type: Number, default: 1},
    sell_brutto_price   : {type: Number, default: 0},
    store               : [{type: ObjectId, ref: 'Store'}],
    vat                 : {type: Number, default: 0},
});

module.exports = mongoose.model('Position', PositionSchema);