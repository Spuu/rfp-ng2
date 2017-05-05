import {Product} from "../resources/product/product.resource";

export class Position {
    _id:string = '';
    _store:string = '';
    _invoice:string = '';
    _product:Product = null;
    index:number = 0;
    buy_netto_price:number = 0.0;
    sell_brutto_price:number = 0.0;
    quantity:number = 0.0;
    discount:number = 0;
    retail_rate:number = 0;

    // excluded from DB
    toDelete:boolean = false;

    constructor(product:Product = null) {
        this._product = product;
    }

    setInputs(invoice:string, store:string) {
        this._invoice = invoice;
        this._store = store;
    }

    copyValues(pos:Position) {
        this.buy_netto_price = pos.buy_netto_price;
        this.sell_brutto_price = pos.sell_brutto_price;
        this.discount = pos.discount;
        this.retail_rate = pos.retail_rate;
    }
}
