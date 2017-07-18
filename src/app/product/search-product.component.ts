import {Component, Output, EventEmitter} from '@angular/core';

import {ProductService} from "../services/core/product.service";
import {ProductQueryParams, ProductQueryParamsBuilder} from "../resources/product/product-query-params";
import {Product} from "../resources/product/product.resource";

@Component({
    selector: 'search-product',
    templateUrl: './search-product.component.html'
})
export class SearchProductComponent {
    @Output() productSelected = new EventEmitter();

    constructor(private productService:ProductService) {
    }

    selectedProduct: Product;

    results: Product[];

    search(event) {
        this.productService.getList(ProductQueryParamsBuilder.prodBuilder().setQuery(event.query).build()).then(data => {
            this.results = data.products;
        });
    }

    select(value) {
        this.productSelected.emit(value);
    }
}

