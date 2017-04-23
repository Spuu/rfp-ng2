import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DummyComponent} from "./dummy.component";
import {CounterpartyListComponent} from "./counterparty/counterparty-list.component";
import {CptyDetailFormComponent} from "./counterparty/counterparty-detail-form.component";
import {StoreListComponent} from "./store/store-list.component";
import {StoreDetailFormComponent} from "./store/store-detail-form.component";
import {ProductListComponent} from "./product/product-list.component";
import {ProductDetailRouterComponent} from "./product/product-detail-router.component";
import {InvoiceListComponent} from "./invoice/invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice/invoice-detail-form.component";
import {AuthGuard} from "./services/auth.guard";
import {PageNotFoundComponent} from "./generic/page-not-found.component";

const appRoutes: Routes = [
    {path: '', component: DummyComponent},
    {path: 'counterparty', component: CounterpartyListComponent, canActivate: [AuthGuard]},
    {path: 'counterparty/:id', component: CptyDetailFormComponent, canActivate: [AuthGuard]},
    {path: 'store', component: StoreListComponent, canActivate: [AuthGuard]},
    {path: 'store/:id', component: StoreDetailFormComponent, canActivate: [AuthGuard]},
    {path: 'product', component: ProductListComponent, canActivate: [AuthGuard]},
    {path: 'product/:id', component: ProductDetailRouterComponent, canActivate: [AuthGuard]},
    {path: 'invoice', component: InvoiceListComponent, canActivate: [AuthGuard]},
    {path: 'invoice/:id', component: InvoiceDetailFormComponent, canActivate: [AuthGuard]},
    {path: '**', component: PageNotFoundComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
