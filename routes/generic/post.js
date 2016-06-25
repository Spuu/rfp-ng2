module.exports = function(req, res) {

    var obj = new utils.model();
    console.log(obj.constructor.modelName);

    obj.setObject(req.body);

    return utils.save(obj, res);
};