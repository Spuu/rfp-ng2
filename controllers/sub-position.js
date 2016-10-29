var Utils = require('../utils/GenericUtils');
var dataModel = require('../models/sub-position');

module.exports = {

    list: function (req, res) {
        dataModel.find(function (err, data) {
            if (err) return Utils.err500(res);
            return res.json(data);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function (err, data) {
            if (err) return Utils.err500(res);

            if (!data) return Utils.err400(res);
            return res.json(data);
        });
    },

    create: function (req, res) {
        var model = new dataModel();
        Utils.setObject(model, req.body);

        model.save(function (err, data) {
            if (err) return Utils.error(res, 500, err);
            return res.json(data);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function (err, data) {
            if (err) return Utils.error(res, 500, err);
            if (!data) return Utils.err400(res);

            Utils.setObject(data, req.body);

            data.save(function (err, data) {
                if (err) return Utils.err500(res);
                if (!data) return Utils.err404(res);
                return res.json(data);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        dataModel.findByIdAndRemove(id, function (err, data) {
            if (err) return Utils.err500(res);
            return res.json(data);
        });
    }
};