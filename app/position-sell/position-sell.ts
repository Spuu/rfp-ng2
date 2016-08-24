import {Model} from "../generic/model";
import {Product} from "../product/product";

export class PositionSell extends Model {
    _id:string = '';
    _product:Product = null;
    _position:string = '';
    buy_netto_price:number = 0.0;
    sell_brutto_price:number = 0.0;
    unit_nominator:number = 1;
    unit_denominator:number = 1;

    constructor(positionId:string) {
        super();

        this._position = positionId;
    }
}
