import { provideRouter, RouterConfig } from '@angular/router';
import {CptyListComponent} from "./cpty/cpty-list.component";
import {CptyDetailFormComponent} from "./cpty/cpty-detail-form.component";
import {StoreListComponent} from "./store/store-list.component";
import {StoreDetailFormComponent} from "./store/store-detail-form.component";
import {ProductListComponent} from "./product/product-list.component";
import {ProductDetailFormComponent} from "./product/product-detail-form.component";
import {InvoiceListComponent} from "./invoice/invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice/invoice-detail-form.component";
import {SearchProductComponent} from "./product/search-product-component";

export const routes: RouterConfig = [
    { path: '', component: SearchProductComponent },
    { path: 'cpty', component: CptyListComponent },
    { path: 'cpty/:id', component: CptyDetailFormComponent },
    { path: 'store', component: StoreListComponent },
    { path: 'store/:id', component: StoreDetailFormComponent },
    { path: 'product', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailFormComponent },
    { path: 'invoice', component: InvoiceListComponent },
    { path: 'invoice/:id', component: InvoiceDetailFormComponent },
    { path: '*', component: CptyListComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];