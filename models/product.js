'use strict'

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema = new Schema({

    cash_register_name      : String, // set in 'pre' function
    cash_register_rate      : { type: Number, default: 1 },
    default_quantity_rate   : { type: Number, default: 1 },
    ean                     : { type: String, required: true },
    _father                  : { type: Schema.ObjectId, ref: 'Product' },
    name                    : { type: String, required: true },
    pih_amount              : { type: Number, default: 0 },
    pih_unit                : { type: String, default: 'szt' },
    sell_unit               : { type: String, default: 'szt' }
});

ProductSchema.pre('save', function(next) {
    // set default if doesn't exist
    if(typeof this.cash_register_name === 'undefined' || !this.cash_register_name)
        this.cash_register_name = this.name;
    next();
});

module.exports = mongoose.model('Product', ProductSchema);