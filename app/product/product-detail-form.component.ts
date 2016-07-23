import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

import {Product} from './product';
import {ProductService} from './product.service';

@Component({
    templateUrl: 'app/product/product-detail-form.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ProductDetailFormComponent implements OnInit, OnDestroy {
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

    putProduct(product:Product) {
        this._productService.put(product)
            .subscribe(
                product => this.product = product,
                error => this.errorMessage = <any>error
            );
    }

    delProduct(id:string) {
        this._productService.del(id)
            .subscribe(
                data => {},
                error => this.errorMessage = <any>error,
                () => this.gotoProducts()
            );
    }

    onSubmit() {
        this.putProduct(this.product);
    }

    onDelete() {
        this.delProduct(this.product._id);
        this.gotoProducts();
    }
}