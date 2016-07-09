
function SetObject(target, obj) {

    var _this = target;
    Object.keys(obj).forEach(function(key) {
        _this[key] = obj[key];
    });
};

module.exports = function(req, res) {

    var model = this.model_info.model();
    var obj = new model();

    //obj.setObject(req.body);
    SetObject(obj, req.body);

    return this.save.bind(this)(obj, res);
};