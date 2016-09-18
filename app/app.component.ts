import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {CptyService} from "./cpty/cpty.service";
import {CptyListComponent} from "./cpty/cpty-list.component";
import {CptyDetailFormComponent} from "./cpty/cpty-detail-form.component";
import {StoreListComponent} from "./store/store-list.component";
import {StoreDetailFormComponent} from "./store/store-detail-form.component";
import {StoreService} from "./store/store.service";
import {ProductListComponent} from "./product/product-list.component";
import {ProductDetailRouterComponent} from "./product/product-detail-router.component";
import {ProductService} from "./product/product.service";
import {InvoiceService} from "./invoice/invoice.service";
import {InvoiceListComponent} from "./invoice/invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice/invoice-detail-form.component";
import {SearchProductComponent} from "./product/search-product.component";
import {PositionComponent} from "./position/position.component";
import {PositionService} from "./position/position.service";
import {DummyComponent} from "./dummy.component";
import {PositionSellService} from "./position-sell/position-sell.service";
import {PositionSellComponent} from "./position-sell/position-sell.component";

@Component({
    selector: 'my-app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a [routerLink]="['/']" class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/cpty']">Kontrahenci</a></li>
                    <li><a [routerLink]="['/store']">Sklepy</a></li>
                    <li><a [routerLink]="['/product']">Produkty</a></li>
                    <li><a [routerLink]="['/invoice']">Faktury</a></li>
                </ul>
            </div>
        </nav>
        <div class='container-fluid'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `,
    directives: [ROUTER_DIRECTIVES],
    providers: [CptyService,
                StoreService,
                ProductService,
                InvoiceService,
                PositionService,
                PositionSellService,
                HTTP_PROVIDERS],
    precompile: [CptyListComponent,
                CptyDetailFormComponent,
                StoreListComponent,
                StoreDetailFormComponent,
                ProductListComponent,
                ProductDetailRouterComponent,
                InvoiceListComponent,
                InvoiceDetailFormComponent,
                SearchProductComponent,
                PositionComponent,
                PositionSellComponent,
                DummyComponent]
})
export class AppComponent {
    pageTitle: string = "ReksFaktPro v2.0.0"
}
