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
        const resource = createResource(this.getClient(), Invoice, this.url);
        return resource;
    }

    async getList(): Promise<InvoiceArray> {
        const resources = await this.getClient().fetch(this.url, InvoiceArray);
        return resources;
    }

    async get(fullURL:string): Promise<Invoice> {
        const resources = await this.getClient().fetch(fullURL, Invoice);
        return resources;
    }

    async post(resource: Invoice): Promise<Invoice> {
        const createdResource = await resource.create();
        return createdResource;
    }

    async put(resource: Invoice): Promise<Invoice> {
        const createdResource = await resource.update();
        return createdResource;
    }
}
