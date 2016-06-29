var Utils = rootRequire('utils/errors');

module.exports = function(req, res) {

    var save_func = this.save.bind(this);

    this.model_info.model().findById(req.params.id, function(err, obj) {
        if (err)
            return Utils.error(res, 400, err);

        obj.setObject(req.body);

        return save_func(obj, res);
    });
};