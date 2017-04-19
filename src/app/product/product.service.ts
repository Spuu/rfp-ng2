import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Logger} from "../services/logger.service";
import {GenericService} from "../generic/generic.service";
import {Product} from "./product";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ProductService extends GenericService<Product> {

    constructor(http: AuthHttp, logger: Logger) {
        super(http, logger);
    }

    protected modelName() {
        return 'product';
    }

    search(query:string, limit?:number):Observable<Product[]> {

        var search_url = `${this.url}/search/${query}`;
        if (limit)
            search_url += `/${limit}`;

        return this.http.get(search_url)
            .map((res:Response) => <Product[]> res.json())
            .do(data => this.logger.debug(`GET /search ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    show_children(id:string):Observable<Product> {
        var url = `${this.url}/${id}/show_children`;

        return this.http.get(url)
            .map((res:Response) => <Product> res.json())
            .do(data => this.logger.debug(`GET /show_child ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    add_child(fatherId:string, childId:string):Observable<Product> {
        var url = `${this.url}/${fatherId}/add_child/${childId}`;

        return this.http.get(url)
            .map((res:Response) => <Product> res.json())
            .do(data => this.logger.debug(`GET /add_child ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    remove_child(fatherId:string, childId:string):Observable<Product> {

        var url = `${this.url}/${fatherId}/remove_child/${childId}`;

        return this.http.get(url)
            .map((res:Response) => <Product> res.json())
            .do(data => this.logger.debug(`GET /remove_child ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }
}
