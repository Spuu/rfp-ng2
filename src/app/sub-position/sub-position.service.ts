import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "../services/logger.service";
import {GenericService} from "../generic/generic.service";
import {SubPosition} from "./sub-position";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class SubPositionService extends GenericService<SubPosition> {

    constructor(http: AuthHttp, logger: Logger) {
        super(http, logger);
    }

    protected modelName() { return 'sub-position'; }
}
