var express = require('express');
var router = express.Router();

var Utils = require('../../utils/GenericUtils');
var StaticData = require('../../utils/StaticData');

var put_with_status = function (req, res) {
    var save_func = this.save.bind(this);
    var model = this.model_info.model();

    this.model_info.model().findById(req.params.id, function(err, obj) {
        if (err)
            return Utils.error(res, 400, err);

        Utils.setObject(obj, req.body);

        //obj.status = StaticData.product.status.updated;
        obj.status = model.statusVal().updated;

        return save_func(obj, res);
    });
};

['product'].forEach(function(entry) {
    var GenericRouter = rootRequire('routes/generic');
    var routes = new GenericRouter(entry);

    router.route('/' + entry)
        .get(routes.list.bind(routes))
        .post(routes.create.bind(routes));

    router.route('/' + entry + '/id/:id')
        .get(routes.show.bind(routes))
        .put(put_with_status.bind(routes))
        .delete(routes.remove.bind(routes));
});

module.exports = router;
