import {Model} from "../generic/model";

export class Product implements Model {
    constructor(public _id:string = '',
                public cash_register_name:string = '',
                public cash_register_rate:string = '1',
                public ean:string = '',
                public _father:string = '',
                public name:string = '',
                public pih_amount:string = '0',
                public pih_unit:string = 'szt',
                public sell_unit:string = 'szt',
                public status:string = 'New',
                public vat: number = 0) {
    }

    public static setDisplayName(obj) {
        obj.disp_name = `${obj.ean} ${obj.name}`
    }

    public static setDisplayNameOnArray(arr) {
        for(var p of arr) {
            Product.setDisplayName(p);
        }
    }
}
