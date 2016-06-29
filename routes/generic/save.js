var Utils = rootRequire('utils/errors');

module.exports = function (obj, res) {

    var model_name = this.model_info.model_name;

    obj.save(function (err) {
        if (err)
            return Utils.error(res, 400, err);

        var jsonVal = {};
        jsonVal[model_name] = obj;
        res.json(jsonVal);
    });
};