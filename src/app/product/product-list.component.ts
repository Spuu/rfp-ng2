import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Product} from './product';
import {ProductService} from './product.service';

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    pageTitle:string = 'Produkty';
    products:Product[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Product = new Product();

    constructor(private _productService:ProductService,
                private _router:Router) {

    }

    ngOnInit():void {
        this._productService.getList()
            .subscribe(
                products => this.products = products,//.slice(0, 40),
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
