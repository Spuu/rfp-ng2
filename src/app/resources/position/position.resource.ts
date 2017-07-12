import {HalResource, HalProperty} from "hal-rest-client";
import {Store} from "../store.resource";
import {Product} from "../product/product.resource";
import {SellPosition} from "./sell-position";

export class Position extends HalResource {
    @HalProperty()
    document: Document;

    @HalProperty()
    index: number;

    @HalProperty()
    store: Store;

    @HalProperty()
    product: Product;

    @HalProperty()
    buyNettoPrice: number;

    @HalProperty()
    sellBruttoPrice: number;

    @HalProperty()
    quantity: number;

    @HalProperty()
    discount: number;

    @HalProperty()
    retailRate: number;

    @HalProperty()
    sellPosition: SellPosition;
}
