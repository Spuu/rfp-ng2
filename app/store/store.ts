import {Model} from "../generic/model";

export class Store extends Model {
    constructor(public _id: string = '',
                public name: string = '') {
        super();
    }
}