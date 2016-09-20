var Utils = require('../utils/GenericUtils');
var dataModel = require('../models/position');
var PositionSell = require('../models/position-sell');
var _ = require('lodash');

module.exports = {

    list: function (req, res) {
        dataModel.find()
            .populate({
                path: '_sell_position _product',
                populate: { path: '_product'}
            })
            .exec(function (err, data) {
                if (err) return Utils.err500(res);
                return res.json(data);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id})
            .populate({
                path: '_sell_position _product',
                populate: { path: '_product'}
            })
            .exec(function (err, data) {
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
            if (data._sell_position)
                PositionSell.findByIdAndRemove(data._sell_position, function (err, sell_data) {
                    if (err) return Utils.err500(res);
                });
            return res.json(data);
        });
    },

    search: function (req, res) {
        var product_id = req.params.product_id;
        var store_id = req.params.store_id;

        var query = {_product: product_id};

        if (store_id)
            query._store = store_id;

        dataModel.find(query)
            .populate({
                path: '_invoice _sell_position',
                populate: { path: '_product'}})
            .exec(function (err, position) {
                if (err) return Utils.error(res, 500, err.message);
                
                if (position.length > 0 || !store_id) {
                    return res.json(
                        _.last(
                            _.orderBy(
                                position, function (el) {
                                    return el._invoice.document_date;
                                }
                            )
                        )
                    )
                }

                dataModel.find({_product: product_id})
                    .populate({
                        path: '_invoice _sell_position',
                        populate: { path: '_product'}})
                    .exec(function (err, position) {
                        if (err) return Utils.error(res, 500, err.message);

                        if(position.length > 0)
                            return res.json(
                            _.last(
                                _.orderBy(
                                    position, function (el) {
                                        return el._invoice.document_date;
                                    }
                                )
                            )
                        );
                        else
                            return res.json(null);
                    });
            });
    },

    invoice: function (req, res) {
        var invoice_id = req.params.invoice_id;

        dataModel.find({_invoice: invoice_id})
            .exec(function (err, positions) {
                if (err) return Utils.error(res, 500, err.message);
                return res.json(positions);
            });
    }
};