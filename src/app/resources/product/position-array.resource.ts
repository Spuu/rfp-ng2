import {HalResource, HalProperty} from "hal-rest-client";
import {Product} from "./product.resource";
import {Position} from "../position/position.resource"
import {Pagination} from "../common/pagination";

export class PositionArray extends HalResource {
    @HalProperty("page")
    pagination: Pagination;

    @HalProperty(Position)
    products: Position[];
}
