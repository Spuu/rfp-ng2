import {Injectable} from '@angular/core';

import {Logger} from "../services/logger.service";
import {HalResourceService} from "../services/hal-resource.service";
import {createResource} from "hal-rest-client";
import {StoreResource} from "./store.resource";

@Injectable()
export class StoreService extends HalResourceService {

    private url = '/stores';

    constructor(logger: Logger) {
        super();
    }

    getEmpty(): StoreResource {
        const resource = createResource(this.getClient(), StoreResource, this.url);
        return resource;
    }

    async getList(): Promise<StoreResource[]> {
        const resources = await this.getClient().fetchArray(this.url, StoreResource);
        return resources;
    }

    async get(fullURL:string): Promise<StoreResource> {
        const resources = await this.getClient().fetch(fullURL, StoreResource);
        return resources;
    }

    async post(resource: StoreResource): Promise<StoreResource> {
        const createdResource = await resource.create();
        return createdResource;
    }

    async put(resource: StoreResource): Promise<StoreResource> {
        const createdResource = await resource.update();
        return createdResource;
    }
}
