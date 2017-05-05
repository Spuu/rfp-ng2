import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ProductService} from '../services/core/product.service';
import {Product} from "../resources/product/product.resource";

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
        // this._productService.get(id)
        //     .subscribe(
        //         selectedProduct => this.selectedProduct = selectedProduct,
        //         error => this.errorMessage = <any>error
        //     );
    }

    gotoProducts() {
        this._router.navigate(['/selectedProduct']);
    }

    onDelete() {
        this.gotoProducts();
    }
}
