var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ListEntrySchema = new Schema({
    _produkt         : [{ type: Schema.ObjectId, ref: 'Product', required: true }],
    quantity         : { type: Number, default: 0 },
    _list            : { type: Schema.ObjectId, ref: 'List', required: true }
});

module.exports = mongoose.model('ListEntry', ListEntrySchema);