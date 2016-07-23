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
    pih_unit                : { type: String, default: 'kg' },
    sell_unit               : { type: String, default: 'szt' },
    status                  : { type: String, enum: ['New', 'Updated', 'Ok'], default: 'New' }
});

ProductSchema.pre('save', function(next) {
    // set default if doesn't exist
    if(typeof this.cash_register_name === 'undefined' || !this.cash_register_name)
        this.cash_register_name = this.name;
    next();
});

ProductSchema.methods.isOk = function() {
    return status === 'Ok';
};

ProductSchema.statics.statusVal = function () {
    return {
        new: 'New',
        updated: 'Updated',
        ok: 'Ok'
    }
};

module.exports = mongoose.model('Product', ProductSchema);