
module.exports = function(req, res) {

    var model = this.model_info.model();
    var obj = new model();

    obj.setObject(req.body);

    return this.save.bind(this)(obj, res);
};