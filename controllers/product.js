var Utils = require('../utils/GenericUtils');
var dataModel = require('../models/product');

module.exports = {

    list: function(req, res) {
        dataModel.find(function(err, data){
            if(err) return Utils.err500(res);
            return res.json(data);
        });
    },

    show: function(req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function(err, data){
            if(err) return Utils.err500(res);

            if(!data) return Utils.err400(res);
            return res.json(data);
        });
    },

    create: function(req, res) {
        var model = new dataModel();
        Utils.setObject(model, req.body);

        model.save(function(err, data){
            if(err) return Utils.error(res, 500, err.message);
            return res.json(data);
        });
    },

    update: function(req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function(err, data){
            if(err) return Utils.error(res, 500, err.message);
            if(!data) return Utils.err400(res);

            Utils.setObject(data, req.body);
            data.status = dataModel.statusVal().updated;

            data.save(function(err, data){
                if(err) return Utils.err500(res);
                if(!data) return Utils.err404(res);
                return res.json(data);
            });
        });
    },

    remove: function(req, res) {
        var id = req.params.id;
        dataModel.findByIdAndRemove(id, function(err, data){
            if(err) return Utils.err500(res);
            return res.json(data);
        });
    },

    ean_name_search: function (req, res) {
        var limit = req.params.limit || 100;

        dataModel.find({
            $or: [{ean: new RegExp(req.params.query, 'i')},
                {name: new RegExp(req.params.query, 'i')}]
        }, function (err, obj) {
            if (err)
                return Utils.error(res, 400, err);

            res.json(obj);
        }).limit(+limit);
    }
};