import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Product} from './product';
import {ProductService} from './product.service';
import {Logger} from "angular2-logger/core";

@Component({
    templateUrl: 'app/product/product-list.component.html'
})
export class ProductListComponent implements OnInit {
    pageTitle:string = 'Produkty';
    products:Product[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Product = new Product();

    constructor(private _productService:ProductService,
                private _router:Router,
                private _logger:Logger) {

    }

    ngOnInit():void {
        this._productService.getList()
            .subscribe(
                products => this.products = products,
                error => this.errorMessage = <any>error);
    }

    select(product:Product) {
        this._router.navigate(['/product', product._id]);
    }

    submit() {
        this.products.push(this.model);
        this.model = new Product();
        this.showNewForm = false;
    }
}
