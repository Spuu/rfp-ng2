import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Product} from './product';
import {Logger} from "angular2-logger/core";

@Injectable()
export class ProductService {
    private _url = 'api/product';

    constructor(private _http: Http,
                private _logger: Logger) {
    }

    getProducts():Observable<Product[]> {
        return this._http.get(this._url)
            .map((res:Response) => <Product[]> res.json())
            .do(data => this._logger.debug(`GET products -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    getProduct(id:string):Observable<Product> {
        return this._http.get(this._url + `/id/${id}`)
            .map((res:Response) => <Product> res.json())
            .do(data => this._logger.debug(`GET product -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    putProduct(product:Product):Observable<Product> {
        let body = JSON.stringify({name: product.name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.put(`${this._url}/id/${product._id}`, body, options)
            .map((res:Response) => <Product> res.json())
            .do(data => this._logger.debug(`PUT product -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    postProduct(product:Product):Observable<Product> {
        let body = JSON.stringify({name: product.name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(this._url, body, options)
            .map((res:Response) => <Product> res.json())
            .do(data => this._logger.debug(`POST product -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    delProduct(id:string):Observable<Response> {
        return this._http.delete(this._url + `/id/${id}`)
            .map((res:Response) => res.json())
            .do(data => this._logger.debug(`DELETE product -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        return Observable.throw(JSON.stringify(error.json().error) || 'Server error');
    }
}