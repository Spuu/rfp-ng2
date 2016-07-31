var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PositionSchema = new Schema({
    _store              : {type: Schema.ObjectId, ref: 'Store', required: true },
    _invoice            : {type: Schema.ObjectId, ref: 'Invoice', required: true },
    _product            : {type: Schema.ObjectId, ref: 'Product', required: true },
    _sell_position      : {type: Schema.ObjectId, ref: 'PositionSell'},
    index               : {type: Number, default: 1},
    buy_netto_price     : {type: Number, default: 0},
    sell_brutto_price   : {type: Number, default: 0},
    quantity            : {type: Number, default: 1},
    discount            : {type: Number, default: 0},
    retail_rate         : {type: Number, default: 1},
    vat                 : {type: Number, default: 0}
});

module.exports = mongoose.model('Position', PositionSchema);