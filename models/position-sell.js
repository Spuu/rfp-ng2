var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PositionSellSchema = new Schema({
    _product            : {type: Schema.ObjectId, ref: 'Product', required: true },
    buy_netto_price     : {type: Number, default: 0},
    sell_brutto_price   : {type: Number, default: 0},
    unit_nominator      : {type: Number, default: 1},
    unit_denominator    : {type: Number, default: 1}
});

module.exports = mongoose.model('PositionSell', PositionSellSchema);