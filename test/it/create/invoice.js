var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        _cpty: TestManager.getId('cpty'),
        name: 'Faktura 1234',
        _store: TestManager.getId('store'),
        document_date: new Date('2016-01-01')
    };

    request(config.api_url)
        .post('/invoice')
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.property('_id');
            res.body.name.should.equal('Faktura 1234');
            res.body._cpty.should.equal(TestManager.getId('cpty'));
            res.body._store.should.equal(TestManager.getId('store'));
            res.body.type.should.equal('Buy');
            res.body.creation_date.should.greaterThan(res.body.document_date);

            TestManager.setId('invoice', res.body._id);

            done();
        });
};