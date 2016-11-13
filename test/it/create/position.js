var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');
var Rx = require('rx');

module.exports = function (done) {

    /**
     * Datasets
     */
    var arti_czol = [
        {
            _invoice: TestManager.getId('invoice_faktura_arti_czoł'),
            _store: TestManager.getId('store_czołgistów'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var zooleszcz_czol = [
        {
            _invoice: TestManager.getId('invoice_faktura_zooleszcz_czoł'),
            _store: TestManager.getId('store_czołgistów'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var eurozoo_czol = [
        {
            _invoice: TestManager.getId('invoice_faktura_eurozoo_czoł'),
            _store: TestManager.getId('store_czołgistów'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var arti_st40 = [
        {
            _invoice: TestManager.getId('invoice_faktura_arti_st40'),
            _store: TestManager.getId('store_staromiejska_40'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var zooleszcz_st40 = [
        {
            _invoice: TestManager.getId('invoice_faktura_zooleszcz_st40'),
            _store: TestManager.getId('store_staromiejska_40'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var eurozoo_st40 = [
        {
            _invoice: TestManager.getId('invoice_faktura_eurozoo_st40'),
            _store: TestManager.getId('store_staromiejska_40'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var arti_slow = [
        {
            _invoice: TestManager.getId('invoice_faktura_arti_słow'),
            _store: TestManager.getId('store_słowackiego'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var zooleszcz_slow = [
        {
            _invoice: TestManager.getId('invoice_faktura_zooleszcz_słow'),
            _store: TestManager.getId('store_słowackiego'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    var eurozoo_slow = [
        {
            _invoice: TestManager.getId('invoice_faktura_eurozoo_słow'),
            _store: TestManager.getId('store_słowackiego'),
            _product: TestManager.getId('product_prod_1'),
            index: 0,
            buy_netto_price: 1,
            sell_brutto_price: 2,
            quantity: 3,
            retail_rate: 4
        }
    ];

    /**
     * Prepare all datasets by concatenating
     */
    var datasets = [];
    [
        arti_czol, arti_slow, arti_st40,
        zooleszcz_czol, zooleszcz_slow, zooleszcz_st40,
        eurozoo_czol, eurozoo_slow, eurozoo_st40
    ].forEach(function(element) {
        datasets = datasets.concat(element);
    });

    /**
     * Request wrapper to get simpler interface
     * @param data Cpty dataset
     * @param cb Validate response
     */
    function createRequest(data, cb) {
        return request(config.api_url)
            .post('/position')
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
            res.body.buy_netto_price.should.equal(data.buy_netto_price);
            res.body._invoice.should.equal(data._invoice);
            res.body.index.should.equal(data.index);
            res.body.quantity.should.equal(data.quantity);
            res.body._product._id.should.equal(data._product);
            res.body.retail_rate.should.equal(data.retail_rate);
            res.body.sell_brutto_price.should.equal(data.sell_brutto_price);
            res.body._store.should.equal(data._store);

            TestManager.setId('position_' + TestManager.findKey(data._invoice) + '_' + data.index, res.body._id);
        },
        function (err) {
            throw err;
        },
        function () {
            TestManager.show();
            done();
        }
    );
};
