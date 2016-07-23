import {Model} from "../generic/model";

export class Cpty implements Model {
    constructor(public _id: string = '',
                public name: string = '',
                public long_name: string = '') {

    }
}