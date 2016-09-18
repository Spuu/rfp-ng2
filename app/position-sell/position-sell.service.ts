import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "angular2-logger/core";
import {GenericService} from "../generic/generic.service";
import {PositionSell} from "./position-sell";

@Injectable()
export class PositionSellService extends GenericService<PositionSell> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'position-sell'; }
}