import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Product} from './product';
import {ProductService} from './product.service';

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    pageTitle:string;
    products:Product[];
    errorMessage:string;
    displayDialog:boolean;

    product:Product;
    isNewProduct:boolean;

    globalFilter:string;
    totalRecords:number;
    lazyPage:number;

    constructor(private _productService:ProductService,
                private _router:Router) {

    }

    ngOnInit():void {
        this.pageTitle = 'Produkty';
        this.displayDialog = false;
        this.products = [];
        this.product = new Product();
        this.totalRecords = 0;
        this.lazyPage = 20;
        this.globalFilter = '';
    }

    select(product:Product) {
        this._router.navigate(['/product', product._id]);
    }

    addNewProduct() {
        this.product = new Product();
        this.isNewProduct = true;
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNewProduct = false;
        this.product = event.data;
        this.displayDialog = true;
    }

    /**
     * Lazy loading takes care of refreshing data,
     * thus no appending or updating this.products is needed.
     */
    closeDialog() {
        this.displayDialog = false;
        this.product = null;
    }

    loadData(event) {

        if (this.globalFilter.length < 3 && this.globalFilter.length != 0)
            return;

        let map = new Map<string, string>();
        map.set('offset', event.first);
        map.set('limit', event.rows);
        map.set('sortField', event.sortField);
        map.set('sortOrder', event.sortOrder);
        map.set('query', this.globalFilter);

        this._productService.getList(map)
            .subscribe(
                products => {
                    this.products = products.docs;
                    this.totalRecords = products.total;
                },
                error => this.errorMessage = <any>error);
    }
}
