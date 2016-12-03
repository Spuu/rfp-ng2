var _ = require('lodash');

var TestManager = function(){

    var idContainer = {};
    var datasetContainer = {};

    /**
     * Keep id of data
     * @param key Unique key being transformed to lower-case and with space replaced by underscore
     * @param value
     */
    var setId = function(key, value) {
        key = key.replace(/ /g, '_').toLowerCase();
        idContainer[key] = value;
    };

    var getId = function(key) {
        key = key.replace(/ /g, '_').toLowerCase();
        return idContainer[key];
    };

    var show = function() {
        console.log(idContainer);
    };

    var findKey = function(value) {
        return _.findKey(idContainer, (v) => v === value);
    };

    /**
     * The same interface for datasets
     */
    var setData = function(key, value) {
        key = key.replace(/ /g, '_').toLowerCase();
        datasetContainer[key] = value;
    };

    var getData = function(key) {
        return datasetContainer[key];
    };

    var showData = function() {
        console.log(datasetContainer);
    };

    var findDataKey = function(value) {
        return _.findKey(datasetContainer, (v) => v === value);
    };

    return {
        setId: setId,
        getId: getId,
        show: show,
        findKey: findKey,
        setData: setData,
        getData: getData,
        showData: showData,
        findDataKey: findDataKey
    }
};

module.exports = TestManager();