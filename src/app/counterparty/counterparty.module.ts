import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {CounterpartyListComponent} from "./counterparty-list.component";
import {CptyDetailFormComponent} from "./counterparty-detail-form.component";
import {CounterpartyService} from "./counterparty.service";
import {DialogModule} from 'primeng/primeng';
import {GenericModule} from "../generic/generic.module";

@NgModule({
    imports: [
        GenericModule,
        CommonModule,
        FormsModule,
        DialogModule
    ],
    declarations: [
        CounterpartyListComponent,
        CptyDetailFormComponent,
    ],
    exports: [
        CounterpartyListComponent
    ],
    providers: [CounterpartyService]
})
export class CptyModule {}
