import {Injectable} from '@angular/core';
import {Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Logger} from "angular2-logger/core";
import {GenericService} from "../generic/generic.service";
import {Product} from "./product";

@Injectable()
export class ProductService extends GenericService<Product> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'product'; }

    search(query:string, limit?:number):Observable<Product[]> {
        
        var search_url = `${this.url.base}/search/${query}`;
        if(limit)
            search_url += `/${limit}`;
        
        return this._http.get(search_url)
            .map((res:Response) => <Product[]> res.json())
            .do(data => this._logger.debug(`GET /search ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }
}