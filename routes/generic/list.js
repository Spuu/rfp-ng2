var Utils = rootRequire('utils/errors');

module.exports = function(req, res) {

    this.model_info.model().find(function(err, obj) {
        if (err) {
            return Utils.error(res, 400, err);
        }

        res.json(obj);
    });
};