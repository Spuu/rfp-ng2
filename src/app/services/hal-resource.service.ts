import {Injectable} from "@angular/core";
import {createClient, HalRestClient, createResource, HalResource} from "hal-rest-client";
import {environment} from "../../environments/environment";
import {InvoiceResource} from "../resources/invoice.resource";
import {CounterpartyResource} from "../counterparty/counterparty.resource";

@Injectable()
export class HalResourceService {

    private client: HalRestClient;

    constructor() {
        this.client = createClient(environment.apiUrl);
    }

    getClient() {
        let token = `Bearer ${localStorage.getItem('id_token')}`;
        return this.client.addHeader('authorization', token);
    }

    /*async get(id:string): Promise<T> {
     const resources = await this.getClient().fetch(this.url + id, T);
     return resources;
     }

     async post(resource: T): Promise<T> {
     const createdResource = await resource.create();
     return createdResource;
     }

     async getInvoices() {
     let invoices: InvoiceResource[];

     let token = `Bearer ${localStorage.getItem('id_token')}`;

     let client = createClient(environment.apiUrl, {'authorization': token, 'Access-Control-Allow-Origin': '*'});

     const ccpty = await client.fetch("/invoices/58cea99cc1f7434ebb9c9c6d/counterparty", T);
     const resource = await client.fetchArray("/invoices", InvoiceResource);
     console.log(ccpty);

     console.log(resource[0]);
     console.log(resource[0].counterparty);
     const counterparty = resource[0].link("counterparty");
     await counterparty.fetch();
     await counterparty.fetch();
     await counterparty.fetch();
     await counterparty.fetch();
     await counterparty.fetch();
     console.log(counterparty.prop("name"));
     console.log("lalalalalalalaalla");
     }*/
}
