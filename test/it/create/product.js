var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');
var Product = require('../../../models/product');
var Rx = require('rx');

module.exports = function (done) {

    /**
     * Datasets
     */
    var datasets = [
        {
            cash_register_name: 'Prod 1', // updated: Prod 1
            ean: '1231111111111', // updated
            name: 'Produkt pierwszy',
            pih_amount: 123, // updated: 1234
            pih_unit: 'g',
            vat: 8 // updated: 23
        },
        {
            cash_register_name: 'Prod 2',
            ean: '1232222222222',
            name: 'Produkt drugi',
            pih_amount: 222,
            pih_unit: 'kg',
            vat: 8
        },
        {
            cash_register_name: 'Prod 3',
            ean: '1233333333333',
            name: 'Produkt trzeci',
            pih_amount: 333,
            pih_unit: 'l',
            vat: 5
        },
        {
            cash_register_name: 'Prod 4',
            ean: '4444444444444',
            name: 'Produkt czwarty',
            pih_amount: 444,
            sel_unit: 'kg',
            vat: 0
        }
    ];

    // saved for update validation
    TestManager.setData('product_1', datasets[0]);

    // saved for list entry
    TestManager.setData('product_2', datasets[1]);
    TestManager.setData('product_3', datasets[2]);
    TestManager.setData('product_4', datasets[3]);

    /**
     * Request wrapper to get simpler interface
     * @param data Cpty dataset
     * @param cb Validate response
     */
    function createRequest(data, cb) {
        return request(config.api_url)
            .post('/product')
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
            res.body.status.should.equal(Product.statusVal().new);
            res.body.name.should.equal(data.name);
            res.body.cash_register_rate.should.equal(1);
            res.body.cash_register_name.should.equal(data.cash_register_name);
            res.body.ean.should.equal(data.ean);
            res.body.pih_amount.should.equal(data.pih_amount);
            res.body.pih_unit.should.equal(data.pih_unit || 'kg');
            res.body.sell_unit.should.equal(data.sell_unit || 'szt');
            res.body.vat.should.equal(data.vat);

            TestManager.setId('product_' + data.cash_register_name, res.body._id);
        },
        function (err) {
            throw err;
        },
        function () {
            done();
        }
    );
};