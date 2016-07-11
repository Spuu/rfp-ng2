var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        long_name: 'Bardzo fajna Arti firma'
    };

    request(config.api_url)
        .put('/cpty/id/' + TestManager.getId('cpty'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.cpty.should.have.property('_id');
            res.body.cpty.name.should.equal('Arti');
            res.body.cpty.long_name.should.equal('Bardzo fajna Arti firma');
            
            done();
        });
};