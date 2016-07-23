import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Product} from './product';
import {Logger} from "angular2-logger/core";
import {GenericService} from "../generic/generic.service";

@Injectable()
export class ProductService extends GenericService<Product> {

    constructor(_http: Http, _logger: Logger) {
        super(_http, _logger);
    }

    protected modelName() { return 'product'; }
}