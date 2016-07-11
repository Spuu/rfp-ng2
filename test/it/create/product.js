var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');
var Product = require('../../../models/product');

module.exports = function (done) {
    var obj = {
        cash_register_name: 'Prod 1',
        ean: '1234567890',
        name: 'Produkt pierwszy',
        pih_amount: 123,
        pih_unit: 'g'
    };

    request(config.api_url)
        .post('/product')
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.product.should.have.property('_id');
            res.body.product.status.should.equal(Product.statusVal().new);
            res.body.product.name.should.equal('Produkt pierwszy');
            res.body.product.cash_register_rate.should.equal(1);
            res.body.product.cash_register_name.should.equal('Prod 1');
            res.body.product.ean.should.equal('1234567890');
            res.body.product.pih_amount.should.equal(123);
            res.body.product.pih_unit.should.equal('g');
            res.body.product.sell_unit.should.equal('szt');
            res.body.product.default_quantity_rate.should.equal(1);

            TestManager.setId('product', res.body.product._id);

            done();
        });
};