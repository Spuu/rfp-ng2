import {Injectable} from '@angular/core';

import {Logger} from "../common/logger.service";
import {HalResourceService} from "./hal-resource.service";
import {createResource} from "hal-rest-client";
import {Invoice} from "../../resources/invoice.resource";
import {InvoiceArray} from "../../resources/invoice-array.resource";

@Injectable()
export class InvoiceService extends HalResourceService {

    private url = '/invoices';

    constructor(logger: Logger) {
        super();
    }

    getEmpty(): Invoice {
        return createResource(this.getClient(), Invoice, this.url);
    }

    getList(): Promise<InvoiceArray> {
        return this.getClient().fetch(this.url, InvoiceArray);
    }

    get(fullURL:string): Promise<Invoice> {
        return this.getClient().fetch(fullURL, Invoice);
    }

    post(resource: Invoice): Promise<Invoice> {
        return resource.create();
    }

    put(resource: Invoice): Promise<Invoice> {
        return resource.update();
    }
}
