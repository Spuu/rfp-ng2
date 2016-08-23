export class Model {
    _id:string;

    set(source:any) {
        var _this = this;
        Object.keys(source).forEach(function (key) {
            _this[key] = source[key];
        });
    };

    clone():Model {
        let model:Model = JSON.parse(JSON.stringify(this));
        model._id = '';
        return model;
    }
}
