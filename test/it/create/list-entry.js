var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');
var Rx = require('rx');

/**
 * Create counterparties
 */
module.exports = function (done) {

    /**
     * Datasets
     */
    var datasets = [
        {
            ean: TestManager.getData('product_1').ean,
            quantity: 1,
            _list: TestManager.getId('list_sold')
        },
        {
            ean: TestManager.getData('product_2').ean,
            quantity: 2,
            _list: TestManager.getId('list_sold')
        },
        {
            ean: TestManager.getData('product_3').ean,
            quantity: 3,
            _list: TestManager.getId('list_inventory')
        },
        {
            ean: TestManager.getData('product_4').ean,
            quantity: 4,
            _list: TestManager.getId('list_inventory')
        },
        {
            ean: TestManager.getData('product_1').ean,
            quantity: 5,
            _list: TestManager.getId('list_list')
        },
        {
            ean: TestManager.getData('product_3').ean,
            quantity: 6,
            _list: TestManager.getId('list_list')
        }];

    /**
     * Request wrapper to get simpler interface
     * @param data Cpty dataset
     * @param cb Validate response
     */
    function createRequest(data, cb) {
        return request(config.api_url)
            .post('/list-entry')
            .send(data)
            .expect(200)
            .end(cb);
    }

    /**
     * Request as observable
     */
    var callReq = Rx.Observable.fromNodeCallback(createRequest);

    /**
     * Observable sending request data
     */
    var dataObs = Rx.Observable.from(datasets);

    /**
     * Observable sending merged concatenated request observables
     */
    var resObs = Rx.Observable.from(datasets).concatMap(function (x) {
        return callReq(x);
    });

    /**
     * Ties up initial dataset and response
     * @param data
     * @param res
     * @returns {{data: *, res: *}}
     */
    function data_res(data, res) {
        return {
            data: data,
            res: res
        }
    }

    /**
     * Validate response and compare it with initial dataset
     */
    Rx.Observable.zip(dataObs, resObs, data_res).subscribe(
        function (obj) {
            var res = obj.res;
            var data = obj.data;
            res.body.should.have.property('_id');
            res.body.ean.should.equal(data.ean);
            res.body.quantity.should.equal(data.quantity);
        },
        function (err) {
            throw err;
        },
        function () {
            done();
        }
    );
};