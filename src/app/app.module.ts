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
import {GenericModule} from "./generic/generic.module";
import {Logger} from "./services/common/logger.service";
import {AuthService} from "./services/common/auth.service";
import {HashService} from "./services/common/hash.service";
import {HalResourceService} from "./services/core/hal-resource.service";
import {NavigationComponent} from "./navigation/navigation.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./services/common/auth.guard";
import {PageNotFoundComponent} from "./generic/page-not-found.component";
import {DateService} from "./services/common/date.service";

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
        GenericModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        Logger,
        HashService,
        HalResourceService,
        DateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
