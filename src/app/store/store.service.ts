import {Injectable} from '@angular/core';

import {Logger} from "../generic/logger.service";
import {GenericService} from "../generic/generic.service";
import {Store} from "./store";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class StoreService extends GenericService<Store> {

    constructor(http: AuthHttp, logger: Logger) {
        super(http, logger);
    }

    protected modelName() { return 'stores'; }
}
