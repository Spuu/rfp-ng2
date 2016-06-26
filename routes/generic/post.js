module.exports = function(req, res) {

    var obj = new this.utils.model();

    obj.setObject(req.body);

    var save = this.utils.save.bind(this.utils);

    return save(obj, res);
};