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
        return createResource(this.getClient(), Counterparty, this.url);
    }

    getList(): Promise<Counterparty[]> {
        return this.getClient().fetchArray(this.url, Counterparty);
    }

    get(fullURL:string): Promise<Counterparty> {
        return this.getClient().fetch(fullURL, Counterparty);
    }

    post(resource: Counterparty): Promise<Counterparty> {
        return resource.create();
    }

    put(resource: Counterparty): Promise<Counterparty> {
        return resource.update();
    }
}
