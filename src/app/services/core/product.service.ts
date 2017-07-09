import {Injectable} from '@angular/core';

import {Logger} from "../common/logger.service";
import {HalResourceService} from "./hal-resource.service";
import {createResource} from "hal-rest-client";
import {Product} from "../../resources/product/product.resource";
import {ProductArray} from "../../resources/product/product-array.resource";
import {ProductQueryParams} from "../../resources/product/product-query-params";
import * as _ from "lodash";
import {CashRegisterInfo} from "../../resources/product/cash-register-info";

@Injectable()
export class ProductService extends HalResourceService {

    private url = '/products';
    private searchUrl = '/products/search/nameOrEan';

    constructor(logger: Logger) {
        super();
    }

    getEmpty(): Product {
        const resource = createResource(this.getClient(), Product, this.url);
        resource.cashRegisterInfo = new CashRegisterInfo();
        resource.groupee = [];
        resource.children = [];
        return resource;
    }

    getList(productQueryParams?: ProductQueryParams): Promise<ProductArray> {
        return this.getClient().fetch(this.buildUrl(productQueryParams), ProductArray);
    }

    get(fullURL:string): Promise<Product> {
        return this.getClient().fetch(fullURL, Product);
    }

    post(resource: Product): Promise<Product> {
        return resource.create();
    }

    put(resource: Product): Promise<Product> {
        return resource.update();
    }

    buildUrl(productQueryParams: ProductQueryParams): string {

        let chosenUrl = this.url;

        if (!_.isEmpty(productQueryParams.query))
            chosenUrl = this.searchUrl;

        chosenUrl += productQueryParams.toString();
        return chosenUrl;
    }
}
