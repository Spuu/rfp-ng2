var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        name: 'Faktura Arti CZ 123456',
        type: 'Sell'
    };

    request(config.api_url)
        .put('/invoice/' + TestManager.getId('invoice_faktura_arti_czoł'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            var data = TestManager.getData('invoice_arti');

            res.body.should.have.property('_id');
            res.body.name.should.equal(obj.name);
            res.body._cpty.should.equal(data._cpty);
            res.body._store.should.equal(data._store);
            res.body.type.should.equal(obj.type);
            res.body.creation_date.should.greaterThan(res.body.document_date);
            res.body.creation_date.should.lessThan(res.body.last_modif_date);

            done();
        });
};