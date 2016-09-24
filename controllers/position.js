var Utils = require('../utils/GenericUtils');
var dataModel = require('../models/position');
var PositionSell = require('../models/position-sell');
var _ = require('lodash');

module.exports = {

    populate: function (req, res) {
        dataModel.populate(req.mydata, {
                path: '_sell_position _product',
                populate: {path: '_product'}
            },
            function (err, data) {
                return res.json(data);
            })
    },

    list: function (req, res, next) {
        dataModel.find()
            .exec(function (err, data) {
                if (err) return Utils.err500(res);
                req.mydata = data;
                next();
            });
    },

    show: function (req, res, next) {
        var id = req.params.id;
        dataModel.findOne({_id: id})
            .exec(function (err, data) {
                if (err) return Utils.err500(res);
                if (!data) return Utils.err400(res);
                req.mydata = data;
                next();
            });
    },

    create: function (req, res, next) {
        var model = new dataModel();
        Utils.setObject(model, req.body);

        model.save(function (err, data) {
            if (err) return Utils.error(res, 500, err);
            req.mydata = data;
            next();
        });
    },

    update: function (req, res, next) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function (err, data) {
            if (err) return Utils.error(res, 500, err);
            if (!data) return Utils.err400(res);

            Utils.setObject(data, req.body);

            data.save(function (err, data) {
                if (err) return Utils.err500(res);
                if (!data) return Utils.err404(res);
                req.mydata = data;
                next();
            });
        });
    },

    remove: function (req, res, next) {
        var id = req.params.id;
        dataModel.findByIdAndRemove(id, function (err, data) {
            if (err) return Utils.err500(res);
            if (data._sell_position)
                PositionSell.findByIdAndRemove(data._sell_position, function (err, sell_data) {
                    if (err) return Utils.err500(res);
                });
            req.mydata = data;
            next();
        });
    },

    search: function (req, res, next) {
        var product_id = req.params.product_id;
        var store_id = req.params.store_id;

        var query = {_product: product_id};

        if (store_id)
            query._store = store_id;

        dataModel.find(query)
            .populate('_invoice')
            .exec(function (err, position) {
                if (err) return Utils.error(res, 500, err.message);

                if (position.length > 0 || !store_id) {
                    req.mydata = _.last(
                        _.orderBy(
                            position, function (el) {
                                return el._invoice.document_date;
                            }
                        )
                    );
                    next();
                } else {
                    dataModel.find({_product: product_id})
                        .populate('_invoice')
                        .exec(function (err, position) {
                            if (err) return Utils.error(res, 500, err.message);

                            if (position.length > 0) {
                                req.mydata = _.last(
                                    _.orderBy(
                                        position, function (el) {
                                            return el._invoice.document_date;
                                        }
                                    )
                                );
                                next();
                            }
                            else {
                                req.mydata = {};
                                next();
                            }
                        });
                }
            });
    },

    invoice: function (req, res, next) {
        var invoice_id = req.params.invoice_id;

        dataModel.find({_invoice: invoice_id})
            .exec(function (err, positions) {
                if (err) return Utils.error(res, 500, err.message);
                req.mydata = positions;
                next();
            });
    }
};