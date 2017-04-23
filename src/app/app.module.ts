import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing}  from './app.routing';

import {AppComponent} from './app.component';
import {DummyComponent} from "./dummy.component";
import {CptyModule} from "./counterparty/counterparty.module";
import {StoreModule} from "./store/store.module";
import {InvoiceModule} from "./invoice/invoice.module";
import {ProductModule} from "./product/product.module";
import {PositionModule} from "./position/position.module";
import {SubPositionModule} from "./sub-position/sub-position.module";
import {GenericModule} from "./generic/generic.module";
import {Logger} from "./services/logger.service";
import {AuthService} from "./services/auth.service";
import {HashService} from "./services/hash.service";
import {HalResourceService} from "./services/hal-resource.service";
import {NavigationComponent} from "./navigation/navigation.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./services/auth.guard";
import {PageNotFoundComponent} from "./generic/page-not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        DummyComponent,
        NavigationComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        CptyModule,
        StoreModule,
        InvoiceModule,
        ProductModule,
        PositionModule,
        SubPositionModule,
        GenericModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        Logger,
        HashService,
        HalResourceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
