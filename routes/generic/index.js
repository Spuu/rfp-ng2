var Utils = function (modelName) {

    this.model_name = modelName;
    this.save       = require('./save');
    this.model      = rootRequire('models/' + this.model_name);
    this.error      = rootRequire('utils/errors');
};

var GenericRouter = function (modelName) {

    this.utils = new Utils(modelName);
};

GenericRouter.prototype.save        = require('./save');
GenericRouter.prototype.get         = require('./get');
GenericRouter.prototype.delete_id   = require('./delete-id');
GenericRouter.prototype.get_id      = require('./get-id');
GenericRouter.prototype.post        = require('./post');
GenericRouter.prototype.put_id      = require('./put-id');

module.exports = GenericRouter;