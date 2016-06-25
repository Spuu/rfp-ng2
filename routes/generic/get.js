module.exports = function(req, res) {

    utils.model.find(function(err, obj) {
        if (err) {
            return utils.error(res, 400, err);
        }

        res.json(obj);
    });
};