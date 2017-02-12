import {Model} from "../generic/model";

export class Product extends Model {
    _id:string = '';
    cash_register_name:string = '';
    cash_register_rate:string = '1';
    ean:string = '';
    _father:string = '';
    name:string = '';
    pih_amount:string = '0';
    pih_unit:string = 'szt';
    sell_unit:string = 'szt';
    status:string = 'New';
    vat:number = 0;
    display_name:string = '';

    _children:Product[] = null;

    constructor() {
        super();
    }
}
