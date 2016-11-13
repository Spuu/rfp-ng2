var request = require('supertest');
var config = require('../../../config');

module.exports = function (done) {

    request(config.api_url)
        .get('/product/search/123/1')
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }

            res.body.should.have.length(1);
            done();
        });
};