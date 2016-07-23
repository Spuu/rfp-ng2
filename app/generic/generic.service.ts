import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Logger} from "angular2-logger/core";
import {Model} from "./model";

@Injectable()
export abstract class GenericService<T extends Model> {

    protected abstract modelName(): string;

    private url = { base: `api/${this.modelName()}`,
                    id: `api/${this.modelName()}/id`};

    constructor(private _http: Http,
                private _logger: Logger) {
    }

    getList():Observable<T[]> {
        return this._http.get(this.url.base)
            .map((res:Response) => <T[]> res.json())
            .do(data => this._logger.debug(`GET ${this.modelName()}(s) -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    get(id:string):Observable<T> {
        return this._http.get(`${this.url.id}/${id}`)
            .map((res:Response) => <T> res.json())
            .do(data => this._logger.debug(`GET ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    put(model:T):Observable<T> {
        let body = JSON.stringify(model);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.put(`${this.url.id}/${model._id}`, body, options)
            .map((res:Response) => <T> res.json())
            .do(data => this._logger.debug(`PUT ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    post(model:T):Observable<T> {
        delete model._id;
        let body = JSON.stringify(model);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(this.url.base, body, options)
            .map((res:Response) => <T> res.json())
            .do(data => this._logger.debug(`POST ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    del(id:string):Observable<Response> {
        return this._http.delete(`${this.url.id}/${id}`)
            .map((res:Response) => res.json())
            .do(data => this._logger.debug(`DELETE ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        return Observable.throw(JSON.stringify(error.json().error) || 'Server error');
    }
}