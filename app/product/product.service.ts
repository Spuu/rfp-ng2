import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "angular2-logger/core";
import {GenericService} from "../generic/generic.service";
import {Product} from "./product";

@Injectable()
export class ProductService extends GenericService<Product> {

    constructor(_http:Http, _logger:Logger) {
        super(_http, _logger);
    }

    protected modelName() {
        return 'product';
    }

    search(query:string, limit?:number):Observable<Product[]> {

        var search_url = `${this.url}/search/${query}`;
        if (limit)
            search_url += `/${limit}`;

        return this._http.get(search_url)
            .map((res:Response) => <Product[]> res.json())
            .do(data => this._logger.debug(`GET /search ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    add_child(fatherId:string, childId:string):Observable<Product> {
        var url = `${this.url}/${fatherId}/add_child/${childId}`;

        return this._http.get(url)
            .map((res:Response) => <Product> res.json())
            .do(data => this._logger.debug(`GET /add_child ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    remove_child(fatherId:string, childId:string):Observable<Product> {

        var url = `${this.url}/${fatherId}/remove_child/${childId}`;

        return this._http.get(url)
            .map((res:Response) => <Product> res.json())
            .do(data => this._logger.debug(`GET /remove_child ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }
}