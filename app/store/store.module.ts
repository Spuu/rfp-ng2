import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {StoreListComponent} from "./store-list.component";
import {StoreDetailFormComponent} from "./store-detail-form.component";
import {StoreService} from "./store.service";
import {GenericModule} from "../generic/generic.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GenericModule
    ],
    declarations: [
        StoreListComponent,
        StoreDetailFormComponent,
    ],
    exports: [
        StoreListComponent
    ],
    providers: [
        StoreService
    ]
})
export class StoreModule {}