import {Model} from "../generic/model";

export class Store implements Model {
    constructor(public _id: string = '',
                public name: string = '') {

    }
}