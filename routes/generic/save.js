module.exports = function (model, res) {

    model.save(function (err) {
        if (err)
            return utils.error(res, 400, err);

        var jsonVal = {};
        jsonVal[this.model_name] = model;
        res.json(jsonVal);
    });
};