import {HalResource, HalProperty} from "hal-rest-client";
import {Pagination} from "./common/pagination";
import {Invoice} from "./invoice.resource";

export class InvoiceArray extends HalResource {
    @HalProperty()
    pagination: Pagination;

    @HalProperty(Invoice)
    invoices: Invoice[];
}
