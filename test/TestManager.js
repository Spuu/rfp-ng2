var TestManager = function(){

    var idContainer = {};

    var setId = function(key, value) {
        idContainer[key] = value;
    };

    var getId = function(key) {
        return idContainer[key];
    };

    return {
        setId: setId,
        getId: getId
    }
};

module.exports = TestManager();