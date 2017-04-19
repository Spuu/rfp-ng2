import {Injectable} from '@angular/core';

import {Logger} from "../services/logger.service";
import {HalResourceService} from "../services/hal-resource.service";
import {createResource} from "hal-rest-client";
import {CounterpartyResource} from "./counterparty.resource";

@Injectable()
export class CounterpartyService extends HalResourceService {

    private url = '/counterparties';

    constructor(logger: Logger) {
        super();
    }

    getEmpty(): CounterpartyResource {
        const resource = createResource(this.getClient(), CounterpartyResource, this.url);
        return resource;
    }

    async getList(): Promise<CounterpartyResource[]> {
        const resources = await this.getClient().fetchArray(this.url, CounterpartyResource);
        return resources;
    }

    async get(fullURL:string): Promise<CounterpartyResource> {
        const resources = await this.getClient().fetch(fullURL, CounterpartyResource);
        return resources;
    }

    async post(resource: CounterpartyResource): Promise<CounterpartyResource> {
        const createdResource = await resource.create();
        return createdResource;
    }

    async put(resource: CounterpartyResource): Promise<CounterpartyResource> {
        const createdResource = await resource.update();
        return createdResource;
    }
}
