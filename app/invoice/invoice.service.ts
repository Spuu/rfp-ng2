import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

import {Invoice} from './invoice';
import {Logger} from "angular2-logger/core";

@Injectable()
export class InvoiceService {
    private _url = 'api/invoice';

    constructor(private _http: Http,
                private _logger: Logger) {
    }

    getInvoices():Observable<Invoice[]> {
        return this._http.get(this._url)
            .map((res:Response) => <Invoice[]> res.json())
            .do(data => this._logger.debug(`GET invoices -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    getInvoice(id:string):Observable<Invoice> {
        return this._http.get(this._url + `/id/${id}`)
            .map((res:Response) => <Invoice> res.json())
            .do(data => this._logger.debug(`GET invoice -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    putInvoice(invoice:Invoice):Observable<Invoice> {
        let body = JSON.stringify({name: invoice.name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.put(`${this._url}/id/${invoice._id}`, body, options)
            .map((res:Response) => <Invoice> res.json())
            .do(data => this._logger.debug(`PUT invoice -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    postInvoice(invoice:Invoice):Observable<Invoice> {
        let body = JSON.stringify({name: invoice.name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(this._url, body, options)
            .map((res:Response) => <Invoice> res.json())
            .do(data => this._logger.debug(`POST invoice -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    delInvoice(id:string):Observable<Response> {
        return this._http.delete(this._url + `/id/${id}`)
            .map((res:Response) => res.json())
            .do(data => this._logger.debug(`DELETE invoice -> ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}