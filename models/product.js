var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema = new Schema({

    cash_register_name      : { type: String, default: name },
    cash_register_rate      : { type: Number, default: 1 },
    default_quantity_rate   : { type: Number, default: 1 },
    ean                     : String,
    father                  : [{ type: ObjectId, ref: 'Product' }],
    name                    : String,
    pih_amount              : { type: Number, default: 0 },
    pih_unit                : { type: String, default: 'szt' },
    sell_unit               : { type: String, default: 'szt' }
});

module.exports = mongoose.model('Product', ProductSchema);