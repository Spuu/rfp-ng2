var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config');

var TestManager = require('./TestManager');

describe('Routes (CRUD)', function () {
    var url = 'http://localhost:3000/api';

    before(function (done) {
        mongoose.connect(config.mongo_url, function () {
            mongoose.connection.db.dropDatabase(function () {
                done();
            });
        });
    });

    beforeEach(function () {

    });

    describe('Create objects', function () {
        it('POST /api/cpty', require('./it/create-cpty')),
        it('POST /api/store', require('./it/create-store')),
        it('POST /api/product', require('./it/create-product')),
        it('POST /api/invoice', require('./it/create-invoice')),
        it('POST /api/position', require('./it/create-position'));
    });
});