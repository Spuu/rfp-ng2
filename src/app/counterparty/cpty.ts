import {Model} from "../generic/model";

export class Counterparty extends Model {
    constructor(public _id: string = '',
                public name: string = '',
                public long_name: string = '') {
        super();
    }
}
