var should = require('should');
var request = require('supertest');
var config = require('../../config');

var TestManager = require('../TestManager');

module.exports = function (done) {
    var obj = {
        _cpty: TestManager.getId('cpty'),
        name: 'Faktura 1234',
        _store: TestManager.getId('store'),
        documentDate: new Date('2016-01-01')
    };

    request(config.api_url)
        .post('/invoice')
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.invoice.should.have.property('_id');
            res.body.invoice.name.should.equal('Faktura 1234');
            res.body.invoice._cpty.should.equal(TestManager.getId('cpty'));
            res.body.invoice._store.should.equal(TestManager.getId('store'));
            res.body.invoice.type.should.equal('Buy');
            res.body.invoice.creationDate.should.greaterThan(res.body.invoice.documentDate);

            TestManager.setId('invoice', res.body.invoice._id);

            done();
        });
};