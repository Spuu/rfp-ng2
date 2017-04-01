import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "../generic/logger.service"
import {GenericService} from "../generic/generic.service";
import {Position} from "./position";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class PositionService extends GenericService<Position> {

    constructor(http: AuthHttp, logger: Logger) {
        super(http, logger);
    }

    protected modelName() { return 'position'; }

    search(productId:string, storeId?:string):Observable<Position> {

        var url = `${this.url}/search/${productId}`;

        if(storeId)
            url += `/${storeId}`;

        return this.http.get(url)
            .map((res:Response) => <Position> res.json())
            .do(data => this.logger.debug(`GET /search ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    getInvoice(invoiceId:string):Observable<Position[]> {

        var url = `${this.url}/invoice/${invoiceId}`;

        return this.http.get(url)
            .map((res:Response) => <Position[]> res.json())
            .do(data => this.logger.debug(`GET ${this.modelName()}(s) -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }
}
