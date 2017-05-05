import {HalResource, HalProperty} from "hal-rest-client";
import {Product} from "./product.resource";
import {Pagination} from "../common/pagination";

export class ProductArray extends HalResource {
    @HalProperty("page")
    pagination: Pagination;

    @HalProperty(Product)
    products: Product[];
}
