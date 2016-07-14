import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Store} from './store';
import {Logger} from "angular2-logger/core";

@Injectable()
export class StoreService {
    private _url = 'api/store';

    constructor(private _http: Http,
                private _logger: Logger) {
    }

    getStores():Observable<Store[]> {
        return this._http.get(this._url)
            .map((res:Response) => <Store[]> res.json())
            .do(data => this._logger.debug(`GET stores -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    getStore(id:string):Observable<Store> {
        return this._http.get(this._url + `/id/${id}`)
            .map((res:Response) => <Store> res.json())
            .do(data => this._logger.debug(`GET store -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    putStore(store:Store):Observable<Store> {
        let body = JSON.stringify({name: store.name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.put(`${this._url}/id/${store._id}`, body, options)
            .map((res:Response) => <Store> res.json())
            .do(data => this._logger.debug(`PUT store -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    postStore(store:Store):Observable<Store> {
        let body = JSON.stringify({name: store.name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(this._url, body, options)
            .map((res:Response) => <Store> res.json())
            .do(data => this._logger.debug(`POST store -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    delStore(id:string):Observable<Response> {
        return this._http.delete(this._url + `/id/${id}`)
            .map((res:Response) => res.json())
            .do(data => this._logger.debug(`DELETE store -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        return Observable.throw(JSON.stringify(error.json().error) || 'Server error');
    }
}