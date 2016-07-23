import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Logger} from "angular2-logger/core";
import {GenericService} from "../generic/generic.service";
import {Invoice} from "./invoice";

@Injectable()
export class InvoiceService extends GenericService<Invoice> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'invoice'; }
}