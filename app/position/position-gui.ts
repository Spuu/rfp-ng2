import {Position} from "./position";
import {Product} from "../product/product"

export class PositionGui extends Position {
    toDelete:boolean = false;

    constructor(public product:Product) {
        super();
    }
}