var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        buy_netto_price: 12.345,
        quantity: 13.12345678,
        retail_rate: 2,
        sell_brutto_price: 25.5,
        vat: 8
    };

    request(config.api_url)
        .put('/position/id/' + TestManager.getId('position'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.position.should.have.property('_id');
            res.body.position.buy_netto_price.should.equal(12.345);
            res.body.position.ean.should.equal('1234567890');
            res.body.position._invoice.should.equal(TestManager.getId('invoice'));
            res.body.position.index.should.equal(0);
            res.body.position.quantity.should.equal(13.12345678);
            res.body.position._product.should.equal(TestManager.getId('product'));
            res.body.position.retail_rate.should.equal(2);
            res.body.position.sell_brutto_price.should.equal(25.5);
            res.body.position._store.should.equal(TestManager.getId('store'));
            res.body.position.vat.should.equal(8);
            done();
        });
};
