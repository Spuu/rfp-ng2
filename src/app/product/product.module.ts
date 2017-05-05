import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import {ProductDetailsComponent} from "./product-details.component";
import {ProductListComponent} from "./product-list.component";
import {ProductRelationsComponent} from "./product-relations.component";
import {SearchProductComponent} from "./search-product.component";
import {ProductDetailRouterComponent} from "./product-detail-router.component";
import {StoreModule} from "../store/store.module";
import {ProductService} from "../services/core/product.service";

import {TypeaheadModule} from 'ng2-bootstrap/ng2-bootstrap';

import {AutoCompleteModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

import {GenericModule} from "../generic/generic.module";

@NgModule({
    imports: [
        TypeaheadModule.forRoot(),
        CommonModule,
        StoreModule,
        FormsModule,
        ReactiveFormsModule,
        GenericModule,
        AutoCompleteModule,
        ButtonModule,
        PanelModule,
        DataTableModule,
        SharedModule,
        DialogModule
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
