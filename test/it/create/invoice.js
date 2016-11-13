var should = require('should');
var request = require('supertest');
var config = require('../../../config');

var TestManager = require('../../modules/TestManager');
var Rx = require('rx');

module.exports = function (done) {

    /**
     * Datasets
     */
    var datasets = [
        // Czołgistów
        {
            _cpty: TestManager.getId('cpty_arti'),
            name: 'Faktura Arti Czoł',
            _store: TestManager.getId('store_czołgistów'),
            document_date: new Date('2016-01-01')
        },
        {
            _cpty: TestManager.getId('store_czołgistów'),
            name: 'Faktura Zooleszcz Czoł',
            _store: TestManager.getId('store_staromiejska_40'),
            document_date: new Date('2016-03-01')
        },
        {
            _cpty: TestManager.getId('cpty_eurozoo'),
            name: 'Faktura Eurozoo Czoł',
            _store: TestManager.getId('store_czołgistów'),
            document_date: new Date('2016-06-01')
        },
        // Staromiejska 40
        {
            _cpty: TestManager.getId('cpty_arti'),
            name: 'Faktura Arti St40',
            _store: TestManager.getId('store_staromiejska_40'),
            document_date: new Date('2016-01-05')
        },
        {
            _cpty: TestManager.getId('cpty_zooleszcz'),
            name: 'Faktura Zooleszcz St40',
            _store: TestManager.getId('store_staromiejska_40'),
            document_date: new Date('2016-03-05')
        },
        {
            _cpty: TestManager.getId('cpty_eurozoo'),
            name: 'Faktura Eurozoo St40',
            _store: TestManager.getId('store_staromiejska_40'),
            document_date: new Date('2016-06-05')
        },
        // Słowackiego
        {
            _cpty: TestManager.getId('cpty_arti'),
            name: 'Faktura Arti Słow',
            _store: TestManager.getId('store_słowackiego'),
            document_date: new Date('2016-01-10')
        },
        {
            _cpty: TestManager.getId('cpty_zooleszcz'),
            name: 'Faktura Zooleszcz Słow',
            _store: TestManager.getId('store_słowackiego'),
            document_date: new Date('2016-03-10'),
            type: 'Sell'
        },
        {
            _cpty: TestManager.getId('cpty_eurozoo'),
            name: 'Faktura Eurozoo Słow',
            _store: TestManager.getId('store_słowackiego'),
            document_date: new Date('2016-06-10'),
            type: 'Sell'
        }
    ];

    /**
     * Request wrapper to get simpler interface
     * @param data Cpty dataset
     * @param cb Validate response
     */
    function createRequest(data, cb) {
        return request(config.api_url)
            .post('/invoice')
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
            res.body._cpty.should.equal(data._cpty);
            res.body._store.should.equal(data._store);
            res.body.type.should.equal(data.type || 'Buy');
            res.body.creation_date.should.greaterThan(res.body.document_date);

            TestManager.setId('invoice_' + data.name, res.body._id);
        },
        function (err) {
            throw err;
        },
        function () {
            done();
        }
    );
};