var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Invoice     = require('./invoice');
var Store       = require('./store');
var Product     = require('./product');

var PositionSchema = new Schema({

    buy_netto_price     : {type: Number, default: 0},
    discount            : {type: Number, default: 0},
    ean                 : {type: String, required: true },
    _invoice             : {type: Schema.ObjectId, ref: 'Invoice', required: true },
    index               : {type: Number, default: 1},
    quantity            : {type: Number, default: 1},
    quantity_rate       : {type: Number, default: 1},
    _product             : {type: Schema.ObjectId, ref: 'Product', required: true },
    retail_rate         : {type: Number, default: 1},
    sell_brutto_price   : {type: Number, default: 0},
    _store               : {type: Schema.ObjectId, ref: 'Store', required: true },
    vat                 : {type: Number, default: 0}
});

module.exports = mongoose.model('Position', PositionSchema);