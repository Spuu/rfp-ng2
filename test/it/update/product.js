var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');
var Product = require('../../../models/product');

module.exports = function (done) {
    var obj = {
        cash_register_name: 'Prod 12',
        name: 'Produkt pierwszy poprawiony',
        pih_amount: 1234,
    };

    request(config.api_url)
        .put('/product/id/' + TestManager.getId('product'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.property('_id');
            res.body.status.should.equal(Product.statusVal().updated);
            res.body.name.should.equal('Produkt pierwszy poprawiony');
            res.body.cash_register_rate.should.equal(1);
            res.body.cash_register_name.should.equal('Prod 12');
            res.body.ean.should.equal('1234567890');
            res.body.pih_amount.should.equal(1234);
            res.body.pih_unit.should.equal('g');
            res.body.sell_unit.should.equal('szt');

            done();
        });
};