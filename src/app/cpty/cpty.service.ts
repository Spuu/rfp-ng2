import {Injectable} from '@angular/core';

import {Logger} from "../generic/logger.service";
import {HalResourceService} from "../resources/hal-resource.service";
import {CounterpartyResource} from "../resources/counterparty.resource";

@Injectable()
export class CptyService extends HalResourceService {

    constructor(logger: Logger) {
        super();
    }

    async getCounterparties(): Promise<CounterpartyResource[]> {
        const resources = await this.getClient().fetchArray("/counterparties", CounterpartyResource);
        return resources;
    }
}
