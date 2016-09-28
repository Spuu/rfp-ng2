import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {routing, appRoutingProviders}  from './app.routing';

import {AppComponent} from './app.component';
import {DummyComponent} from "./dummy.component";
import {Logger} from "angular2-logger/core";
import {CptyModule} from "./cpty/cpty.module";
import {StoreModule} from "./store/store.module";
import {InvoiceModule} from "./invoice/invoice.module";
import {ProductModule} from "./product/product.module";
import {PositionModule} from "./position/position.module";
import {PositionSellModule} from "./position-sell/position-sell.module";
import {GenericModule} from "./generic/generic.module";

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
        PositionSellModule,
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