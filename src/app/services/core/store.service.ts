import {Injectable} from '@angular/core';

import {Logger} from "../common/logger.service";
import {HalResourceService} from "./hal-resource.service";
import {createResource} from "hal-rest-client";
import {Store} from "../../resources/store.resource";

@Injectable()
export class StoreService extends HalResourceService {

    private url = '/stores';

    constructor(logger: Logger) {
        super();
    }

    getEmpty(): Store {
        const resource = createResource(this.getClient(), Store, this.url);
        return resource;
    }

    async getList(): Promise<Store[]> {
        const resources = await this.getClient().fetchArray(this.url, Store);
        return resources;
    }

    async get(fullURL:string): Promise<Store> {
        const resources = await this.getClient().fetch(fullURL, Store);
        return resources;
    }

    async post(resource: Store): Promise<Store> {
        const createdResource = await resource.create();
        return createdResource;
    }

    async put(resource: Store): Promise<Store> {
        const createdResource = await resource.update();
        return createdResource;
    }
}
