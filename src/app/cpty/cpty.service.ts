import {Injectable} from '@angular/core';

import {Logger} from "../generic/logger.service";
import {GenericService} from "../generic/generic.service";
import {Cpty} from "./cpty";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class CptyService extends GenericService<Cpty> {

    constructor(http: AuthHttp, logger: Logger) {
        super(http, logger);
    }

    protected modelName() { return 'counterparties'; }
}
