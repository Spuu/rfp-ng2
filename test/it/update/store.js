var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {
    var obj = {
        name: 'Czołgistów 23'
    };

    request(config.api_url)
        .put('/store/id/' + TestManager.getId('store'))
        .send(obj)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.store.should.have.property('_id');
            res.body.store.name.should.equal('Czołgistów 23');

            done();
        });
};