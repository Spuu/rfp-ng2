import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

import {Product} from './product';
import {ProductService} from './product.service';
import {ProductDetailsComponent} from "./product-details.component";

@Component({
    templateUrl: 'app/product/product-detail-router.component.html',
    directives: [ROUTER_DIRECTIVES, ProductDetailsComponent]
})
export class ProductDetailRouterComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Dane Produktu';
    product: Product;
    errorMessage: string;

    private sub:any;

    constructor(private _productService:ProductService,
                private _router:Router,
                private _route:ActivatedRoute) {
    }


    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            let id = params['id'];
            this.getProduct(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProduct(id:string) {
        this._productService.get(id)
            .subscribe(
                product => this.product = product,
                error => this.errorMessage = <any>error
            );
    }

    gotoProducts() {
        this._router.navigate(['/product']);
    }

    onDelete() {
        this.gotoProducts();
    }
}