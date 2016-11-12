import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
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

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        CptyModule,
        StoreModule,
        InvoiceModule,
        ProductModule,
        PositionModule,
        SubPositionModule,
        GenericModule
    ],
    declarations: [
        AppComponent,
        DummyComponent
    ],
    providers: [
        appRoutingProviders,
        Logger
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}