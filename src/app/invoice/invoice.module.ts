import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {InvoiceListComponent} from "./invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice-detail-form.component";
import {InvoiceNewFormComponent} from "./invoice-new-form.component";
import {PositionModule} from "../position/position.module";
import {GenericModule} from "../generic/generic.module";
import {InvoiceService} from "../services/core/invoice.service";

import {CalendarModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GenericModule,
        PositionModule,
        CalendarModule
    ],
    declarations: [
        InvoiceListComponent,
        InvoiceDetailFormComponent,
        InvoiceNewFormComponent,
    ],
    exports: [
        InvoiceListComponent
    ],
    providers: [
        InvoiceService
    ]
})
export class InvoiceModule {}
