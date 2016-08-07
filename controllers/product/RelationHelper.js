"use strict";

var Product = require('../../models/product');
var Rx = require('rx');

class RelationHelper {

    constructor(fatherId, childId) {
        this.findById = Rx.Observable.fromNodeCallback(Product.findById, Product);
        this.checkIfBothExist = Rx.Observable.zip(this.findById(fatherId), this.findById(childId), RelationHelper.formFatherChild);
        this.checkCycleObs = Rx.Observable.fromNodeCallback(this.checkCycle.bind(this));
        this.addChildObs = this.addChild();
    }

    static formFatherChild(father, child) {
        return {
            father: father,
            child: child
        }
    }

    addChild() {
        var _this = this;

        return Rx.Observable.create(function (observer) {
            _this.checkIfBothExist.subscribe(
                function (data) {
                    _this.checkCycleObs(data.father, data.child).subscribe(
                        function (success) {
                            observer.onNext(data);
                        },
                        function (err) {
                            observer.onError(new Error('Check cycles: ' + err.message));
                        },
                        function () {
                            observer.onCompleted();
                        }
                    );
                },
                function (err) {
                    observer.onError(new Error('Check if both exist: ' + err.message));
                }
            );
        });
    }

    findNextAncestor(id, observer) {
        var _this = this;

        Product.findById(id, function (err, data) {
            if (err)
                observer.onError(new Error('Find next ancestor: ' + err.message));

            observer.onNext(data);

            data._father === undefined ?
                observer.onCompleted() : _this.findNextAncestor(data._father, observer);
        });
    }

    lookForAncestors(id) {
        var _this = this;

        return Rx.Observable.create(function (observer) {
            _this.findNextAncestor(id, observer);
        });
    }

    checkCycle(father, child, cb) {
        var familyBranch = [];

        if (cb) {
            if (!child || !father)
                return cb(new Error('No child or father'));

            if (child._id.equals(father._id))
                return cb(new Error('Child is father?!'));

            if (child._father !== undefined) {
                if (child._father.equals(father._id))
                    return cb(new Error('Child is already related to that father'));
                else
                    return cb(new Error('Child already has different father'));
            }
        }

        familyBranch.push(child._id.toString(), father._id.toString());

        if (father._father === undefined) {
            if (cb) cb(null, true);
            return;
        }

        var subscription = this.lookForAncestors(father._father).subscribe(
            function (data) {
                if (familyBranch.indexOf(data._id.toString()) != -1) {
                    subscription.dispose();
                    if (cb) cb(new Error('Cycle found'));
                } else {
                    familyBranch.push(data._id.toString());
                }
            },
            function (err) {
                if (cb) cb(new Error(err));
            },
            function () {
                if (cb) cb(null, true);
            }
        );
    }
}

module.exports = RelationHelper;