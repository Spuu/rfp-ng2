import {Model} from "../generic/model";
import {Product} from "../product/product";
import {SubPosition} from "../sub-position/sub-position";

export class Position extends Model {
    _id:string = '';
    _store:string = '';
    _invoice:string = '';
    _product:Product = null;
    _sub_position:SubPosition = null;
    index:number = 0;
    buy_netto_price:number = 0.0;
    sell_brutto_price:number = 0.0;
    quantity:number = 0.0;
    discount:number = 0;
    retail_rate:number = 0;

    // excluded from DB
    toDelete:boolean = false;

    constructor(product:Product = null) {
        super();

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

    prepareSubPosition(ps:SubPosition) {
        if(!this._sub_position) {
            this._sub_position = new SubPosition();
            this._sub_position._product = ps._product;
            this._sub_position.buy_netto_price = ps.buy_netto_price;
            this._sub_position.sell_brutto_price = ps.sell_brutto_price;
            this._sub_position.unit_nominator = ps.unit_nominator;
            this._sub_position.unit_denominator = ps.unit_denominator;
        }
    }
}