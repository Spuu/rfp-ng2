import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {routing, appRoutingProviders}  from './app.routing';

import {AppComponent} from './app.component';
import {DummyComponent} from "./dummy.component";
import {CptyListComponent} from "./cpty/cpty-list.component";
import {CptyDetailFormComponent} from "./cpty/cpty-detail-form.component";
import {StoreListComponent} from "./store/store-list.component";
import {StoreDetailFormComponent} from "./store/store-detail-form.component";
import {ProductDetailsComponent} from "./product/product-details.component";
import {ProductListComponent} from "./product/product-list.component";
import {InvoiceListComponent} from "./invoice/invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice/invoice-detail-form.component";
import {PositionSellService} from "./position-sell/position-sell.service";
import {PositionService} from "./position/position.service";
import {InvoiceService} from "./invoice/invoice.service";
import {ProductService} from "./product/product.service";
import {StoreService} from "./store/store.service";
import {CptyService} from "./cpty/cpty.service";
import {InvoiceNewFormComponent} from "./invoice/invoice-new-form.component";
import {PositionSellComponent} from "./position-sell/position-sell.component";
import {ProductRelationsComponent} from "./product/product-relations.component";
import {SearchProductComponent} from "./product/search-product.component";
import {ModalConfirmationButton} from "./generic/modal-confirmation-button.component";
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Logger } from "angular2-logger/core";
import {PositionComponent} from "./position/position.component";
import {PositionListComponent} from "./position/position-list.component";
import {ProductDetailRouterComponent} from "./product/product-detail-router.component";

@NgModule({
    imports: [
        TypeaheadModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        DummyComponent,
        CptyListComponent,
        CptyDetailFormComponent,
        StoreListComponent,
        StoreDetailFormComponent,
        ProductDetailsComponent,
        ProductListComponent,
        ProductRelationsComponent,
        ProductDetailRouterComponent,
        PositionSellComponent,
        PositionComponent,
        PositionListComponent,
        InvoiceListComponent,
        InvoiceDetailFormComponent,
        InvoiceNewFormComponent,
        SearchProductComponent,
        ModalConfirmationButton
    ],
    providers: [
        appRoutingProviders,
        CptyService,
        StoreService,
        ProductService,
        InvoiceService,
        PositionService,
        PositionSellService,
        Logger
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}