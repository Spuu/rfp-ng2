import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

import {Cpty} from './cpty';
import {Logger} from "angular2-logger/core";

@Injectable()
export class CptyService {
    private _url = 'api/cpty';

    constructor(private _http: Http,
                private _logger: Logger) {
    }

    getCpties():Observable<Cpty[]> {
        return this._http.get(this._url)
            .map((res:Response) => <Cpty[]> res.json())
            .do(data => this._logger.debug(`GET cpties -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    getCpty(id:string):Observable<Cpty> {
        return this._http.get(this._url + `/id/${id}`)
            .map((res:Response) => <Cpty> res.json())
            .do(data => this._logger.debug(`GET cpty -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    putCpty(cpty:Cpty):Observable<Cpty> {
        let body = JSON.stringify({name: cpty.name, long_name: cpty.long_name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.put(`${this._url}/id/${cpty._id}`, body, options)
            .map((res:Response) => <Cpty> res.json())
            .do(data => this._logger.debug(`PUT cpty -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    postCpty(cpty:Cpty):Observable<Cpty> {
        let body = JSON.stringify({name: cpty.name, long_name: cpty.long_name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(this._url, body, options)
            .map((res:Response) => <Cpty> res.json())
            .do(data => this._logger.debug(`POST cpty -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    delCpty(id:string):Observable<Response> {
        return this._http.delete(this._url + `/id/${id}`)
            .map((res:Response) => res.json())
            .do(data => this._logger.debug(`DELETE cpty -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}