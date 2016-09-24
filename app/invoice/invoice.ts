import {Model} from "../generic/model";

export class Invoice extends Model {
    constructor(public _id: string = '',
                public _cpty: string = '',
                public creationDate: string = Date.now().toString(),
                public documentDate: string = Date.now().toString(),
                public name: string = '',
                public lastModifDate: string = Date.now().toString(),
                public _store: string = '',
                public type: string = 'Buy') {
        super();
    }
}
