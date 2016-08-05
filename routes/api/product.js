var express = require('express');
var router = express.Router();
var Product = require('../../models/product');

var Utils = require('../../utils/GenericUtils');
var StaticData = require('../../utils/StaticData');
var Rx = require('rx');
var _ = require('lodash');

var put_with_status = function (req, res) {
    var save_func = this.save.bind(this);
    var model = this.model_info.model();

    this.model_info.model().findById(req.params.id, function (err, obj) {
        if (err)
            return Utils.error(res, 400, err);

        Utils.setObject(obj, req.body);

        //obj.status = StaticData.product.status.updated;
        obj.status = model.statusVal().updated;

        return save_func(obj, res);
    });
};

var ean_name_search = function (req, res) {
    var model = this.model_info.model();

    var limit = req.params.limit || 100;

    this.model_info.model().find({
        $or: [{ean: new RegExp(req.params.query, 'i')},
            {name: new RegExp(req.params.query, 'i')}]
    }, function (err, obj) {
        if (err)
            return Utils.error(res, 400, err);

        res.json(obj);
    }).limit(+limit);
};

var checkForCycle = function (child, father, cb) {
    var familyBranch = [];
    var isDone = false;
    var findById = Rx.Observable.fromNodeCallback(Product.findById, Product);

    if (cb) {
        console.log('%s %s', child._id, father._id);
        console.log('%s %s', child._father, father._id);

        if (child._id === father._id)
            return cb('Child is father?!');
        else if (child._father == father._id)
            return cb('Child is already related to father');
        else if (child._father !== undefined)
            return cb('Child already has father');
    }

    familyBranch.push(child._id, father._id);
    while (!isDone) {
        var last = _.last(familyBranch);
        if (last._father === undefined) {
            isDone = true;

            if (cb) cb(null, true);
        } else if (familyBranch.length === _.uniq(familyBranch).length) {
            isDone = true;

            if (cb) cb('Cycle found');
        } else {
            findById(last._father).subscribe(
                function (x) {
                    familyBranch.push(x);
                },
                function (err) {
                    if (cb) cb(err);
                },
                function () {
                });
        }
    }
}

var add_child = function (req, res) {
    var model = this.model_info.model();

    var child, father;

    this.id_f = req.params.id_f;
    this.id_c = req.params.id_c;

    var findById = Rx.Observable.fromNodeCallback(Product.findById, Product);
    var findChild = findById(this.id_c);
    var findFather = findById(this.id_f);

    var checkIfBothExist = Rx.Observable.zip(findChild, findFather,
        function (c, f) {
            return [c, f];
        });

    var checkCycle = Rx.Observable.fromNodeCallback(checkForCycle);

    checkIfBothExist.subscribe(
        function (x) {
            child = _.head(x);
            father = _.last(x);
            checkCycle(child, father).subscribe(
                function (x) {
                    child._father = father;
                    father._children.push(child);

                    child.save(function (err) {
                        if (err)
                            res.json(err);
                        else
                            father.save(function (err) {
                                if (err)
                                    res.json(err);

                                res.json(father);
                            });
                    });
                },
                function (err) {
                    res.json(err);
                }
            );
        },
        function (err) {
            res.json(err);
        },
        function () {
        });
};


['product'].forEach(function (entry) {
    var GenericRouter = rootRequire('routes/generic');
    var routes = new GenericRouter(entry);

    router.route('/' + entry)
        .get(routes.list.bind(routes))
        .post(routes.create.bind(routes));

    router.route('/' + entry + '/id/:id')
        .get(routes.show.bind(routes))
        .put(put_with_status.bind(routes))
        .delete(routes.remove.bind(routes));

    router.route('/' + entry + '/search/:query/:limit?')
        .get(ean_name_search.bind(routes));

    router.route('/' + entry + '/:id_f/add_child/:id_c')
        .get(add_child.bind(routes));

    // router.route('/' + entry + '/:id_f/del_child/:id_c')
    //     .get(del_child.bind(routes));
});

module.exports = router;
