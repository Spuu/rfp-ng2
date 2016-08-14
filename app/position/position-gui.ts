import {Position} from "./position";
import {Product} from "../product/product"

export class PositionGui extends Position {
    constructor(public product:Product) {
        super();
    }
}