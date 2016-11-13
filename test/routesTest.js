var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config');

var TestManager = require('./modules/TestManager');

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
            it('POST /api/cpty', require('./it/create/cpty')),
            it('POST /api/store', require('./it/create/store')),
            it('POST /api/product', require('./it/create/product')),
            it('POST /api/invoice', require('./it/create/invoice')),
            it('POST /api/position', require('./it/create/position'));
    });

    describe('Updating objects', function () {
            it('PUT /api/cpty', require('./it/update/cpty')),
            it('PUT /api/invoice', require('./it/update/invoice')),
            it('PUT /api/position', require('./it/update/position')),
            it('PUT /api/product', require('./it/update/product')),
            it('PUT /api/store', require('./it/update/store'));
    });

    describe('Searching products', function () {
            it('GET /api/product/search/123', require('./it/product/search_query')),
            it('GET /api/product/search/123/1', require('./it/product/search_query_limit'));
    });

    describe('Products relation', function () {
        it('GET add_child  0 <- 1, (no father error)', require('./it/product/relate_0_1_err')),
            it('GET add_child  1 <- 0, (no child error)', require('./it/product/relate_1_0_err')),
            it('GET add_child  1 <- 1, (self-relation error)', require('./it/product/relate_1_1_err')),
            it('GET add_child  1 <- 2', require('./it/product/relate_1_2')),
            it('GET add_child  1 <- 2 (double relation error)', require('./it/product/relate_1_2_err')),
            it('GET add_child  2 <- 3', require('./it/product/relate_2_3')),
            it('GET add_child  3 <- 1 (cycle error)', require('./it/product/relate_3_1_err')),
            it('GET add_child  4 <- 3 (another father error)', require('./it/product/relate_4_3_err')),
            it('GET add_child  4 <- 1', require('./it/product/relate_4_1')),
            it('GET add_child  3 <- 4 (cycle error)', require('./it/product/relate_3_4_err')),
            it('GET remove_child  3 <- 4 (no relation error)', require('./it/product/unrelate_3_4_err')),
            it('GET remove_child  4 <- 1', require('./it/product/unrelate_4_1')),
            it('GET remove_child  2 <- 3', require('./it/product/unrelate_2_3')),
            it('GET add_child  1 <- 3', require('./it/product/relate_1_3'));
    });

    describe('Deleting objects', function () {

    });
});