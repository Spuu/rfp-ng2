var Utils = require('../../utils/GenericUtils');

module.exports = function(req, res) {

    var model = this.model_info.model();
    var obj = new model();

    Utils.setObject(obj, req.body);

    return this.save.bind(this)(obj, res);
};