var Utils = function(){

    var error = function (res, status, message) {
        return res.status(status).json({ error : message });
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
        setObject: setObject,
        objectValues: objectValues
    }
};

module.exports = Utils();

