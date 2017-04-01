import {Injectable} from '@angular/core';

import {Logger} from "../generic/logger.service"
import {GenericService} from "../generic/generic.service";
import {Invoice} from "./invoice";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class InvoiceService extends GenericService<Invoice> {

    constructor(http: AuthHttp, logger: Logger) {
        super(http, logger);
    }

    protected modelName() { return 'invoice'; }
}
