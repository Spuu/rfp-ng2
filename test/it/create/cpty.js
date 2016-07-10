var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        name: 'Arti',
        long_name: 'Fajna Arti firma'
    };

    request(config.api_url)
        .post('/cpty')
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.cpty.should.have.property('_id');
            res.body.cpty.name.should.equal('Arti');
            res.body.cpty.long_name.should.equal('Fajna Arti firma');

            TestManager.setId('cpty', res.body.cpty._id);
            done();
        });
};