import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Product} from './product';
import {ProductService} from './product.service';

@Component({
    templateUrl: './product-detail-router.component.html'
})
export class ProductDetailRouterComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Dane Produktu';
    product: Product = null;
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
