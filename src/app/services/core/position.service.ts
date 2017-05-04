import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "../common/logger.service"
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class PositionService {

    constructor(http: AuthHttp, logger: Logger) {

    }

    protected modelName() { return 'position'; }

    // search(productId:string, storeId?:string):Observable<Position> {
    //
    //     var url = `${this.url}/search/${productId}`;
    //
    //     if(storeId)
    //         url += `/${storeId}`;
    //
    //     return this.http.get(url)
    //         .map((res:Response) => <Position> res.json())
    //         .do(data => this.logger.debug(`GET /search ${this.modelName()} -> ${JSON.stringify(data)}`))
    //         .catch(this.handleError);
    // }
    //
    // getInvoice(invoiceId:string):Observable<Position[]> {
    //
    //     var url = `${this.url}/invoice/${invoiceId}`;
    //
    //     return this.http.get(url)
    //         .map((res:Response) => <Position[]> res.json())
    //         .do(data => this.logger.debug(`GET ${this.modelName()}(s) -> ${JSON.stringify(data)}`))
    //         .catch(this.handleError);
    // }
}
