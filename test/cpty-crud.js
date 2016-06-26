var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config');

describe('CRUD', function() {
    var url = 'http://localhost:3000/api';

    before(function(done) {
        mongoose.connect(config.mongo_url);
        done();
    });

    beforeEach(function() {
        mongoose.connection.db.dropDatabase();
    });

    describe('Create Cpty', function() {
        it('should insert Cpty', function(done) {
            var cpty = {
                name: 'Arti',
                long_name: 'Fajna Arti firma'
            };

            request(url)
                .post('/cpty')
                .send(cpty)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    res.body.cpty.should.have.property('_id');
                    res.body.cpty.name.should.equal('Arti');
                    res.body.cpty.long_name.should.equal('Fajna Arti firma');
                    done();
                });
        });
    });
});