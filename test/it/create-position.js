var should = require('should');
var request = require('supertest');
var config = require('../../config');

var TestManager = require('../TestManager');

module.exports = function (done) {
    var obj = {
        buy_netto_price: 12.34,
        ean: '1234567890',
        _invoice: TestManager.getId('invoice'),
        index: 0,
        quantity: 3.12345678,
        _product: TestManager.getId('product'),
        retail_rate: 1.8,
        sell_brutto_price: 25,
        _store: TestManager.getId('store'),
        vat: 23
    };

    request(config.api_url)
        .post('/position')
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.position.should.have.property('_id');
            res.body.position.buy_netto_price.should.equal(12.34);
            res.body.position.ean.should.equal('1234567890');
            res.body.position._invoice.should.equal(TestManager.getId('invoice'));
            res.body.position.index.should.equal(0);
            res.body.position.quantity.should.equal(3.12345678);
            res.body.position._product.should.equal(TestManager.getId('product'));
            res.body.position.retail_rate.should.equal(1.8);
            res.body.position.sell_brutto_price.should.equal(25);
            res.body.position.sell_brutto_price.should.equal(25);
            res.body.position._store.should.equal(TestManager.getId('store'));
            res.body.position.vat.should.equal(23);
            done();
        });
};

// buy_netto_price     : {type: Number, default: 0},
// discount            : {type: Number, default: 0},
// ean                 : {type: String, required: true },
// _invoice             : {type: Schema.ObjectId, ref: 'Invoice', required: true },
// index               : {type: Number, default: 1},
// quantity            : {type: Number, default: 1},
// quantity_rate       : {type: Number, default: 1},
// _product             : {type: Schema.ObjectId, ref: 'Product', required: true },
// retail_rate         : {type: Number, default: 1},
// sell_brutto_price   : {type: Number, default: 0},
// _store               : {type: Schema.ObjectId, ref: 'Store', required: true },
// vat 
