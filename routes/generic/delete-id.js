module.exports = function(req, res) {

    utils.model.remove({
        _id: req.params.id
    }, function(err, obj) {
        if(err)
            return utils.error(res, 400, err);

        res.json(obj);
    });
};