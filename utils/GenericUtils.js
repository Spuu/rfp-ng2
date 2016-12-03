var Utils = function(){


    var error = function (res, status, message) {
        console.log('Status: ' + status + ', message: ', message);
        return res.status(status).json({ error : message });
    };

    var err500 = function (res) {
        return error(res, 500, 'Error getting data');
    };

    var err404 = function (res) {
        return error(res, 404, 'No such data');
    };

    var setObject = function(target, obj) {

        var _this = target;
        Object.keys(obj).forEach(function(key) {
            _this[key] = obj[key];
        });
    };

    var objectValues = obj => Object.keys(obj).map(key => obj[key]);

    return {
        error: error,
        err500: err500,
        err404: err404,
        setObject: setObject,
        objectValues: objectValues
    }
};

module.exports = Utils();

