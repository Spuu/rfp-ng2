import {Injectable} from '@angular/core';
import {Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import {Logger} from "./logger.service";
import {Model} from "./model";
import {environment} from "../../environments/environment";
import {DocumentsREST} from "./documents-rest";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export abstract class GenericService<T extends Model> {

    protected abstract modelName():string;

    protected url = `${environment.apiUrl}/${this.modelName()}`;

    constructor(protected http:AuthHttp,
                protected logger:Logger) {
    }

    getList(params?:Map<string,string>):Observable<DocumentsREST<T>> {

        let newUrl = `${this.url}`;

        if (params) {
            let pList = [];
            params.forEach((value, key) => {
                    console.log(`${key}=${value}`);
                    pList.push(`${key}=${value}`)
                }
            );

            if (pList.length != 0)
                newUrl += '?' + pList.join('&');
        }

        return this.http.get(newUrl)
            .map(res => <DocumentsREST<T>> res.json())
            .do(data => this.logger.debug(`GET ${this.modelName()}(s) -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    get(id:string):Observable<T> {
        return this.http.get(`${this.url}/${id}`)
            .map((res:Response) => <T> res.json())
            .do(data => this.logger.debug(`GET ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    put(model:T):Observable<T> {
        let body = JSON.stringify(model);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.put(`${this.url}/${model._id}`, body, options)
            .map((res:Response) => <T> res.json())
            .do(data => this.logger.debug(`PUT ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    post(model:T):Observable<T> {
        for (let key in model) {
            if (!model[key] && key.startsWith('_'))
                delete model[key];
        }

        let body = JSON.stringify(model);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.url, body, options)
            .map((res:Response) => <T> res.json())
            .do(data => this.logger.debug(`POST ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    del(id:string):Observable<T> {
        return this.http.delete(`${this.url}/${id}`)
            .map((res:Response) => <T> res.json())
            .do(data => this.logger.debug(`DELETE ${this.modelName()} -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    protected handleError(error:Response) {

        let defaultMsg:string = 'Server error';
        let message:string = JSON.stringify(error);// ? (error.json() ? JSON.stringify(error.json().error) : defaultMsg) : defaultMsg;

        return Observable.throw(message || defaultMsg);
    }
}
