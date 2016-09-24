var Utils = require('../utils/GenericUtils');
var RelationHelper = require('./product/RelationHelper');
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

            if(!data) return Utils.err404(res);
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
    },

    show_children: function(req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id})
            .populate('_children')
            .exec(function(err, data) {
                if(err) return Utils.err500(res);
                if(!data) return Utils.err404(res);
                return res.json(data);
            });
    },

    add_child: function (req, res) {
        var rh = new RelationHelper(req.params.id_f, req.params.id_c);
        rh.addChildObs.subscribe(
            function (data) {
                data.child._father = data.father;
                data.father._children.push(data.child);
                
                data.child.save(function (err) {
                    if (err) return Utils.error(res, 500, err.message);
                });

                data.father.save(function (err) {
                    if (err) return Utils.error(res, 500, err.message);
                    return res.json(data.father);
                });
            },
            function (err) {
                return Utils.error(res, 500, err.message);
            },
            function() {
                console.log("end of world");
            }
        );
    },

    remove_child: function (req, res) {
        var rh = new RelationHelper(req.params.id_f, req.params.id_c);
        rh.checkIfBothExist.subscribe(
            function (data) {

                if(!data.father || !data.child)
                    return Utils.error(res, 500, 'No child or father.');

                var child_index = data.father._children.indexOf(data.child._id);

                if(data.child._father === undefined || child_index === -1) {
                    return Utils.error(res, 500, 'No relation between child and father.');
                }

                data.child._father = undefined;
                data.father._children.splice(child_index, 1);

                data.child.save(function (err) {
                    if (err) return Utils.error(res, 500, err.message);
                });

                data.father.save(function (err) {
                    if (err) return Utils.error(res, 500, err.message);

                    return res.json(data.father);
                });
            },
            function (err) {
                return Utils.error(res, 500, err.message);
            }
        );
    }
};