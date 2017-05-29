import {Product} from "../product/product.resource";

export class SellPosition {
    product: Product;
    buyNettoPrice: number;
    sellBruttoPrice: number;
    unitNominator: number;
    unitDenominator: number;
}
