import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "../generic/logger.service";
import {GenericService} from "../generic/generic.service";
import {SubPosition} from "./sub-position";

@Injectable()
export class SubPositionService extends GenericService<SubPosition> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'sub-position'; }
}