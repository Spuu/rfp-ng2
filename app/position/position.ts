import {Model} from "../generic/model";

export class Position implements Model {
    constructor(public _id: string = '',
                public _store: string = '',
                public _invoice: string = '',
                public _product: string = '',
                public _sell_position: string = '',
                public index: number = 0,
                public buy_netto_price: number = 0.0,
                public sell_brutto_price: number = 0.0,
                public quantity: number = 0.0,
                public discount: number = 0,
                public retail_rate: number = 0) {
    }

    setInputs(product:string, invoice:string, store:string) {
        this._product = product;
        this._invoice = invoice;
        this._store = store;
    }
}
