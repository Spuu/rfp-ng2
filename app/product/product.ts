export class Product {
    constructor(public _id:string = '',
                public cash_register_name:string = '',
                public cash_register_rate:string = '1',
                public default_quantity_rate:string = '1',
                public ean:string = '',
                public _father:string = '',
                public name:string = '',
                public pih_amount:string = '0',
                public pih_unit:string = 'szt',
                public sell_unit:string = 'szt',
                public status:string = 'New') {
    }
}
