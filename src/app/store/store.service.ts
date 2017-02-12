import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Logger} from "../generic/logger.service";
import {GenericService} from "../generic/generic.service";
import {Store} from "./store";

@Injectable()
export class StoreService extends GenericService<Store> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'store'; }
}