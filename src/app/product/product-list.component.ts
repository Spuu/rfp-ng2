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
    showNewForm:boolean;
    model:Product;

    globalFilter:string;
    totalRecords:number;
    lazyPage:number;

    constructor(private _productService:ProductService,
                private _router:Router) {

    }

    ngOnInit():void {
        this.pageTitle = 'Produkty';
        this.showNewForm = false;
        this.model = new Product();
        this.products = [];
        this.totalRecords = 0;
        this.lazyPage = 20;
        this.globalFilter = '';
    }

    select(product:Product) {
        this._router.navigate(['/product', product._id]);
    }

    submit() {
        this.products.push(this.model);
        this.model = new Product();
        this.showNewForm = false;
    }

    loadData(event) {

        if (this.globalFilter.length < 3 && this.globalFilter.length != 0)
            return;

        let map = new Map<string, string>();
        map.set('offset', event.first);
        map.set('limit', event.rows);
        map.set('sort', event.sortField);
        map.set('order', event.sortOrder);
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
