import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

import { ICpty } from './cpty';

@Injectable()
export class CptyService {
    private _cptyUrl = 'api/cpty';

    constructor(private _http: Http) { }

    getCpties(): Observable<ICpty[]> {
        return this._http.get(this._cptyUrl)
            .map((response: Response) => <ICpty[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCpty(id: string): Observable<ICpty> {
        return this.getCpties()
            .map((cpties: ICpty[]) => cpties.find(c => c._id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}