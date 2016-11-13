var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        buy_netto_price: 1.5,
        sell_brutto_price: 2.5,
        quantity: 3.5,
        retail_rate: 4.5
    };

    request(config.api_url)
        .put('/position/' + TestManager.getId('position_invoice_faktura_arti_czoł_0'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            var data = TestManager.getData('position_arti_czol');
            
            res.body.should.have.property('_id');
            res.body.buy_netto_price.should.equal(obj.buy_netto_price);
            res.body._invoice.should.equal(data._invoice);
            res.body.index.should.equal(data.index);
            res.body.quantity.should.equal(obj.quantity);
            res.body._product._id.should.equal(data._product);
            res.body.retail_rate.should.equal(obj.retail_rate);
            res.body.sell_brutto_price.should.equal(obj.sell_brutto_price);
            res.body._store.should.equal(data._store);
            done();
        });
};
