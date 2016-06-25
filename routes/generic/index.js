function GenericRouter(modelName) {

    this.model_name = modelName;

    utils = {
        save: GenericRouter.prototype.save,
        model: rootRequire('models/' + this.model_name),
        error: rootRequire('utils/errors')
    };
}

GenericRouter.prototype.save        = require('./save');
GenericRouter.prototype.get         = require('./get');
GenericRouter.prototype.delete_id   = require('./delete-id');
GenericRouter.prototype.get_id      = require('./get-id');
GenericRouter.prototype.post        = require('./post');
GenericRouter.prototype.put_id      = require('./put-id');

module.exports = GenericRouter;