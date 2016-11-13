var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');

module.exports = function (done) {

    var father = TestManager.getId('product_prod_4');
    var child = TestManager.getId('product_prod_3');

    request(config.api_url)
        .get(`/product/${father}/add_child/${child}`)
        .expect(500)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.property('error');
            done();
        });
};