import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Logger} from "angular2-logger/core";
import {GenericService} from "../generic/generic.service";
import {Cpty} from "./cpty";

@Injectable()
export class CptyService extends GenericService<Cpty> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'cpty'; }
}