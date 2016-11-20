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
    var sold = {
        name: 'Sold products',
        _store: TestManager.getId('store_staromiejska_40'),
        type: 'Sold'
    };

    var inventory = {
        name: 'Remanent',
        _store: TestManager.getId('store_staromiejska_40'),
        type: 'Inventory'
    };

    var list = {
        name: 'Regular list of products',
        _store: TestManager.getId('store_staromiejska_40'),
        type: 'List'
    };

    var datasets = [sold, inventory, list];

    /**
     * Request wrapper to get simpler interface
     * @param data Cpty dataset
     * @param cb Validate response
     */
    function createRequest(data, cb) {
        return request(config.api_url)
            .post('/list')
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
            res.body.name.should.equal(data.name);
            res.body.type.should.equal(data.type);
            TestManager.setId('list_' + res.body.type, res.body._id);
        },
        function (err) {
            throw err;
        },
        function () {
            done();
        }
    );
};