module.exports = function(req, res) {

    this.utils.model.findById(req.params.id, function(err, obj) {
        if (err)
            return this.utils.error(res, 400, err);

        obj.setObject(req.body);

        this.utils.save(obj, res).bind(this.utils);
    });
};