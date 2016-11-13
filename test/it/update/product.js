var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');
var Product = require('../../../models/product');

module.exports = function (done) {
    var obj = {
        cash_register_name: 'Prod 1a',
        name: 'Produkt pierwszy poprawiony',
        pih_amount: 1234,
        vat: 23
    };

    request(config.api_url)
        .put('/product/' + TestManager.getId('product_prod_1'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            var data = TestManager.getData('product_1');

            res.body.should.have.property('_id');
            res.body.status.should.equal(Product.statusVal().updated);
            res.body.name.should.equal(obj.name);
            res.body.cash_register_rate.should.equal(1);
            res.body.cash_register_name.should.equal(obj.cash_register_name);
            res.body.ean.should.equal(data.ean);
            res.body.pih_amount.should.equal(obj.pih_amount);
            res.body.pih_unit.should.equal(data.pih_unit);
            res.body.sell_unit.should.equal(data.sell_unit || 'szt');
            res.body.vat.should.equal(obj.vat);

            done();
        });
};