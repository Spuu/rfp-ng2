import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {InvoiceListComponent} from "./invoice-list.component";
import {InvoiceDetailFormComponent} from "./invoice-detail-form.component";
import {InvoiceFormComponent} from "./invoice-form.component";
import {PositionModule} from "../position/position.module";
import {GenericModule} from "../generic/generic.module";
import {InvoiceService} from "../services/core/invoice.service";

import {CalendarModule} from 'primeng/primeng';
import {DropdownModule} from "primeng/components/dropdown/dropdown";

@NgModule({
    imports: [
        CommonModule,
        GenericModule,
        PositionModule,
        CalendarModule,
        DropdownModule,
        ReactiveFormsModule
    ],
    declarations: [
        InvoiceListComponent,
        InvoiceDetailFormComponent,
        InvoiceFormComponent
    ],
    exports: [
        InvoiceListComponent
    ],
    providers: [
        InvoiceService
    ]
})
export class InvoiceModule {}
