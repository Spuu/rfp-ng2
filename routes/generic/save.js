var Utils = require('../../utils/GenericUtils');

module.exports = function (obj, res) {

    var model_name = this.model_info.model_name;

    obj.save(function (err) {
        if (err)
            return Utils.error(res, 400, err);
        
        res.json(obj);
    });
};