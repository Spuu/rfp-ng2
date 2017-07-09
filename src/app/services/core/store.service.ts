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
        return createResource(this.getClient(), Store, this.url);
    }

    getList(): Promise<Store[]> {
        return this.getClient().fetchArray(this.url, Store);
    }

    get(fullURL:string): Promise<Store> {
        return this.getClient().fetch(fullURL, Store);
    }

    post(resource: Store): Promise<Store> {
        return resource.create();
    }

    put(resource: Store): Promise<Store> {
        return resource.update();
    }
}
