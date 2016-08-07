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
        .put('/invoice/' + TestManager.getId('invoice'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.property('_id');
            res.body.name.should.equal('Faktura 123456');
            res.body._cpty.should.equal(TestManager.getId('cpty'));
            res.body._store.should.equal(TestManager.getId('store'));
            res.body.type.should.equal('Sell');
            res.body.creation_date.should.greaterThan(res.body.document_date);
            res.body.creation_date.should.lessThan(res.body.last_modif_date);

            done();
        });
};