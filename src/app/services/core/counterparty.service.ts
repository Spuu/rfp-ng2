import {Injectable} from '@angular/core';

import {Logger} from "../common/logger.service";
import {HalResourceService} from "./hal-resource.service";
import {createResource} from "hal-rest-client";
import {Counterparty} from "../../resources/counterparty.resource";

@Injectable()
export class CounterpartyService extends HalResourceService {

    private url = '/counterparties';

    constructor(logger: Logger) {
        super();
    }

    getEmpty(): Counterparty {
        const resource = createResource(this.getClient(), Counterparty, this.url);
        return resource;
    }

    async getList(): Promise<Counterparty[]> {
        const resources = await this.getClient().fetchArray(this.url, Counterparty);
        return resources;
    }

    async get(fullURL:string): Promise<Counterparty> {
        const resources = await this.getClient().fetch(fullURL, Counterparty);
        return resources;
    }

    async post(resource: Counterparty): Promise<Counterparty> {
        const createdResource = await resource.create();
        return createdResource;
    }

    async put(resource: Counterparty): Promise<Counterparty> {
        const createdResource = await resource.update();
        return createdResource;
    }
}
