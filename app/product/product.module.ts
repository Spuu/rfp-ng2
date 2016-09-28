import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {ProductDetailsComponent} from "./product-details.component";
import {ProductListComponent} from "./product-list.component";
import {ProductRelationsComponent} from "./product-relations.component";
import {SearchProductComponent} from "./search-product.component";
import {ProductDetailRouterComponent} from "./product-detail-router.component";
import {StoreModule} from "../store/store.module";
import {ProductService} from "./product.service";

import {TypeaheadModule} from 'ng2-bootstrap/ng2-bootstrap';
import {GenericModule} from "../generic/generic.module";

@NgModule({
    imports: [
        TypeaheadModule,
        CommonModule,
        StoreModule,
        FormsModule,
        GenericModule
    ],
    declarations: [
        ProductDetailsComponent,
        ProductListComponent,
        ProductRelationsComponent,
        ProductDetailRouterComponent,
        SearchProductComponent,
    ],
    exports: [
        ProductListComponent,
        ProductDetailsComponent,
        ProductRelationsComponent,
        SearchProductComponent,
    ],
    providers: [
        ProductService
    ]
})
export class ProductModule {}