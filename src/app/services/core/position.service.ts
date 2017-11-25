import {Injectable} from '@angular/core';

import {Logger} from "../common/logger.service";
import {HalResourceService} from "./hal-resource.service";
import {createResource} from "hal-rest-client";
import {CashRegisterInfo} from "../../resources/product/cash-register-info";
import {QueryParams} from "../../resources/common/pagination-query-params";
import {PositionArray} from "../../resources/product/position-array.resource";
import {Position} from "../../resources/position/position.resource";

@Injectable()
export class PositionService extends HalResourceService {

    private url = '/position';
    private searchUrl = '/products/search/nameOrEan';

    constructor(logger: Logger) {
        super();
    }

    getEmpty(): Position {
        const resource = createResource(this.getClient(), Position, this.url);
        // resource.cashRegisterInfo = new CashRegisterInfo();
        // resource.groupee = [];
        // resource.children = [];
        return resource;
    }

    getList(queryParams?: QueryParams): Promise<PositionArray> {
        return this.getClient().fetch(this.buildUrl(queryParams), PositionArray);
    }

    get(fullURL:string): Promise<Position> {
        return this.getClient().fetch(fullURL, Position);
    }

    post(resource: Position): Promise<Position> {
        return resource.create();
    }

    put(resource: Position): Promise<Position> {
        return resource.update();
    }

    buildUrl(queryParams: QueryParams): string {
        if (!queryParams)
            return this.url;

        return this.url + queryParams.toString();
    }
}

//
//
//
// import {Injectable} from '@angular/core';
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'
//
// import {Logger} from "../common/logger.service"
// import {AuthHttp} from "angular2-jwt";
//
// @Injectable()
// export class PositionService {
//
//     constructor(http: AuthHttp, logger: Logger) {
//
//     }
//
//     protected modelName() { return 'position'; }
//
//     // search(productId:string, storeId?:string):Observable<Position> {
//     //
//     //     var url = `${this.url}/search/${productId}`;
//     //
//     //     if(storeId)
//     //         url += `/${storeId}`;
//     //
//     //     return this.http.get(url)
//     //         .map((res:Response) => <Position> res.json())
//     //         .do(data => this.logger.debug(`GET /search ${this.modelName()} -> ${JSON.stringify(data)}`))
//     //         .catch(this.handleError);
//     // }
//     //
//     // getInvoice(invoiceId:string):Observable<Position[]> {
//     //
//     //     var url = `${this.url}/invoice/${invoiceId}`;
//     //
//     //     return this.http.get(url)
//     //         .map((res:Response) => <Position[]> res.json())
//     //         .do(data => this.logger.debug(`GET ${this.modelName()}(s) -> ${JSON.stringify(data)}`))
//     //         .catch(this.handleError);
//     // }
// }
