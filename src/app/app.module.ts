import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';
import {routing, appRoutingProviders}  from './app.routing';

import {AppComponent} from './app.component';
import {DummyComponent} from "./dummy.component";
import {CptyModule} from "./cpty/cpty.module";
import {StoreModule} from "./store/store.module";
import {InvoiceModule} from "./invoice/invoice.module";
import {ProductModule} from "./product/product.module";
import {PositionModule} from "./position/position.module";
import {SubPositionModule} from "./sub-position/sub-position.module";
import {GenericModule} from "./generic/generic.module";
import {Logger} from "./generic/logger.service";
import {AuthService} from "./auth/auth.service";
import {authFactory} from "./auth/auth.factory";
import {AuthHttp} from "angular2-jwt";

@NgModule({
    declarations: [
        AppComponent,
        DummyComponent
    ],
    imports: [
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
        appRoutingProviders,
        AuthService,
        Logger,
        {
            provide: AuthHttp,
            useFactory: authFactory,
            deps: [Http, RequestOptions]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
