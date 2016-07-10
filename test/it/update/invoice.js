var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        name: 'Faktura 123456',
        type: 'Sell'
    };

    request(config.api_url)
        .put('/invoice/id/' + TestManager.getId('invoice'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.invoice.should.have.property('_id');
            res.body.invoice.name.should.equal('Faktura 123456');
            res.body.invoice._cpty.should.equal(TestManager.getId('cpty'));
            res.body.invoice._store.should.equal(TestManager.getId('store'));
            res.body.invoice.type.should.equal('Sell');
            res.body.invoice.creationDate.should.greaterThan(res.body.invoice.documentDate);
            res.body.invoice.creationDate.should.lessThan(res.body.invoice.lastModifDate);

            done();
        });
};