import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "../generic/logger.service"
import {GenericService} from "../generic/generic.service";
import {Position} from "./position";

@Injectable()
export class PositionService extends GenericService<Position> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'position'; }

    search(productId:string, storeId?:string):Observable<Position> {

        var url = `${this.url}/search/${productId}`;

        if(storeId)
            url += `/${storeId}`;

        return this._http.get(url)
            .map((res:Response) => <Position> res.json())
            .do(data => this._logger.debug(`GET /search ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    getInvoice(invoiceId:string):Observable<Position[]> {

        var url = `${this.url}/invoice/${invoiceId}`;

        return this._http.get(url)
            .map((res:Response) => <Position[]> res.json())
            .do(data => this._logger.debug(`GET ${this.modelName()}(s) -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }
}