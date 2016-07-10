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

            res.body.product.should.have.property('_id');
            res.body.product.status.should.equal(Product.statusVal().updated);
            res.body.product.name.should.equal('Produkt pierwszy poprawiony');
            res.body.product.cash_register_rate.should.equal(1);
            res.body.product.cash_register_name.should.equal('Prod 12');
            res.body.product.ean.should.equal('1234567890');
            res.body.product.pih_amount.should.equal(1234);
            res.body.product.pih_unit.should.equal('g');
            res.body.product.sell_unit.should.equal('szt');
            res.body.product.default_quantity_rate.should.equal(1);

            done();
        });
};