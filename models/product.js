var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema = new Schema({

    cash_register_name      : String, // set in 'pre' function
    cash_register_rate      : { type: Number, default: 1 },
    default_quantity_rate   : { type: Number, default: 1 },
    ean                     : { type: String, required: true },
    father                  : [{ type: Schema.ObjectId, ref: 'Product' }],
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

ProductSchema.methods.setObject = function (obj) {

    this.cash_register_name     = obj.cash_register_name;
    this.cash_register_rate     = obj.cash_register_rate;
    this.default_quantity_rate  = obj.default_quantity_rate;
    this.ean                    = obj.ean;
    this.father                 = obj.father;
    this.name                   = obj.name;
    this.pih_amount             = obj.pih_amount;
    this.pih_unit               = obj.pih_unit;
    this.sell_unit              = obj.sell_unit;
};

module.exports = mongoose.model('Product', ProductSchema);