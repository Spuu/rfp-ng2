module.exports = function(req, res) {

    utils.model.findById(req.params.id, function(err, obj) {
        if (err)
            return utils.error(res, 400, err);

        obj.setObject(req.body);

        return utils.save(obj, res);
    });
};