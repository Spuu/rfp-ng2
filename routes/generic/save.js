module.exports = function (model, res) {

    var model_name = this.model_name;

    model.save(function (err) {
        if (err)
            return this.error(res, 400, err);

        var jsonVal = {};
        jsonVal[model_name] = model;
        res.json(jsonVal);
    });
};