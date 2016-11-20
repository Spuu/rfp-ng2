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
            quantity: 1,
            description: 'testing',
            _categories: [TestManager.getId('category_product_23')],
            _store_src: TestManager.getId('store_czołgistów'),
            _store_dst: TestManager.getId('store_słowackiego'),
            _product_src: TestManager.getId('product_prod_1'),
            _product_dst: TestManager.getId('product_prod_2')
        },
        {
            quantity: 2,
            description: 'testing 2',
            _categories: [TestManager.getId('category_product_23')],
            _store_src: TestManager.getId('store_staromiejska_40'),
            _store_dst: TestManager.getId('store_słowackiego'),
            _product_src: TestManager.getId('product_prod_3'),
            _product_dst: TestManager.getId('product_prod_4')
        },
        {
            quantity: 3,
            description: 'testing 3',
            _categories: [TestManager.getId('category_product_23')],
            _store_src: TestManager.getId('store_staromiejska_40'),
            _store_dst: TestManager.getId('store_czołgistów'),
            _product_src: TestManager.getId('product_prod_3'),
            _product_dst: TestManager.getId('product_prod_1')
        }
    ];

    /**
     * Request wrapper to get simpler interface
     * @param data Cpty dataset
     * @param cb Validate response
     */
    function createRequest(data, cb) {
        return request(config.api_url)
            .post('/substitution')
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
            res.body.quantity.should.equal(data.quantity);
            res.body._store_src.should.equal(data._store_src);
            res.body._store_dst.should.equal(data._store_dst);
            res.body._product_src.should.equal(data._product_src);
            res.body._product_dst.should.equal(data._product_dst);
            res.body.description.should.equal(data.description);
        },
        function (err) {
            throw err;
        },
        function () {
            done();
        }
    );
};