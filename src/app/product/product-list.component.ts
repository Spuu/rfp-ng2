import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {ProductService} from '../services/core/product.service';
import {Product} from "../resources/product/product.resource";
import {ProductQueryParamsBuilder, ProductQueryParams} from "../resources/product/product-query-params";
import * as _ from "lodash";

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    pageTitle:string;
    products:Product[];
    errorMessage:string;

    selectedProduct:Product;

    globalFilter:string;
    totalRecords:number;
    pageSize:number;

    private lastQueryParams: ProductQueryParams;

    constructor(private productService:ProductService,
                private router:Router) {}

    ngOnInit():void {
        this.pageTitle = 'Produkty';
        this.products = [];
        this.selectedProduct = undefined;
        this.totalRecords = 0;
        this.pageSize = 20;
        this.globalFilter = '';
    }

    addNewProduct() {
        this.selectedProduct = this.productService.getEmpty();
    }

    onRowSelect(event) {
        this.selectedProduct = event.data;
    }

    /**
     * Lazy loading takes care of refreshing data,
     * thus no appending or updating this.products is needed.
     */
    closeDialog() {
        this.selectedProduct = undefined;
    }

    loadData(event) {

        if (this.globalFilter.length < 3 && this.globalFilter.length != 0)
            return;

        let page = Math.floor(event.first / event.rows);

        let queryParams = ProductQueryParamsBuilder.prodBuilder();
        queryParams
            .setQuery(this.globalFilter)
            .setPage(page)
            .setSize(this.pageSize)
            .setSortField(event.sortField)
            .setSortOrder(event.sortOrder);

        let newQueryParams = queryParams.build();

        // due to PrineNG onLazyLoad event being triggered multiple times in a row
        // for performance reasons keep last queries
        // if they're equal within timeout, ignore that query
        if (_.isEqual(newQueryParams, this.lastQueryParams))
            return;

        this.lastQueryParams = newQueryParams;

        this.productService.getList(newQueryParams).then((data) => {
            this.products = data.products;
            this.totalRecords = data.pagination.totalElements;
        });

        // reset lastQueryParams after timeout
        setTimeout(() =>
            this.lastQueryParams = undefined, 1000);
    }
}
