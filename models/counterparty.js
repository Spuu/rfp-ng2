var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var CounterpartySchema = new Schema({
    name        : String,
    long_name   : { type: String, required: false }
});

// CounterpartySchema.pre('save', function (next) {
//     if(!this.long_name)
//         this.long_name = this.name;
//
//     next();
// });

module.exports = mongoose.model('Counterparty', CounterpartySchema);