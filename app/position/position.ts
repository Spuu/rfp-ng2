import {Model} from "../generic/model";
import {Product} from "../product/product";

export class Position extends Model {
    _id:string = '';
    _store:string = '';
    _invoice:string = '';
    _product:string = '';
    _sell_position:string = '';
    index:number = 0;
    buy_netto_price:number = 0.0;
    sell_brutto_price:number = 0.0;
    quantity:number = 0.0;
    discount:number = 0;
    retail_rate:number = 0;

    // excluded from DB
    product:Product;
    toDelete:boolean = false;

    constructor(product:Product = null) {
        super();

        this.product = product;
    }

    setInputs(product:string, invoice:string, store:string) {
        this._product = product;
        this._invoice = invoice;
        this._store = store;
    }
}