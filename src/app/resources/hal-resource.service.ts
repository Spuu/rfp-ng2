import {Injectable} from "@angular/core";
import {createClient, HalRestClient} from "hal-rest-client";
import {environment} from "../../environments/environment";

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

    /*async getInvoices() {
        let invoices: InvoiceResource[];

        let token = `Bearer ${localStorage.getItem('id_token')}`;

        let client = createClient(environment.apiUrl, {'authorization': token, 'Access-Control-Allow-Origin': '*'});

        const ccpty = await client.fetch("/invoices/58cea99cc1f7434ebb9c9c6d/counterparty", CounterpartyResource);
        const resource = await client.fetchArray("/invoices", InvoiceResource);
        console.log(ccpty);

        console.log(resource[0]);
        console.log(resource[0].counterparty);
        const cpty = resource[0].link("counterparty");
        await cpty.fetch();
        await cpty.fetch();
        await cpty.fetch();
        await cpty.fetch();
        await cpty.fetch();
        console.log(cpty.prop("name"));
        console.log("lalalalalalalaalla");
    }*/
}
