var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        buy_netto_price: 12.34,
        _invoice: TestManager.getId('invoice'),
        index: 0,
        quantity: 3.12345678,
        _product: TestManager.getId('product'),
        retail_rate: 1.8,
        sell_brutto_price: 25,
        _store: TestManager.getId('store')
    };

    request(config.api_url)
        .post('/position')
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.property('_id');
            res.body.buy_netto_price.should.equal(12.34);
            res.body._invoice.should.equal(TestManager.getId('invoice'));
            res.body.index.should.equal(0);
            res.body.quantity.should.equal(3.12345678);
            res.body._product._id.should.equal(TestManager.getId('product'));
            res.body.retail_rate.should.equal(1.8);
            res.body.sell_brutto_price.should.equal(25);
            res.body._store.should.equal(TestManager.getId('store'));

            TestManager.setId('position', res.body._id);

            done();
        });
};
