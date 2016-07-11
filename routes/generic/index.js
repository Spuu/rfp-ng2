"use strict"

class ModelInfo {
    constructor(modelName) {
        this.model_name = modelName;
    }

    model() {
        return rootRequire('models/' + this.model_name);
    }
};

class GenericRouter {

    constructor(modelName) {
        this.model_info = new ModelInfo(modelName);
    }

    list(req, res) {
        return require('./list').bind(this)(req, res);
    }

    show(req, res) {
        return require('./show').bind(this)(req, res);
    }

    remove(req, res) {
        return require('./remove').bind(this)(req, res);
    }

    update(req, res) {
        return require('./update').bind(this)(req, res);
    }

    create(req, res) {
        return require('./create').bind(this)(req, res);
    }

    save(obj, res) {
        return require('./save').bind(this)(obj, res);
    }
};

module.exports = GenericRouter;