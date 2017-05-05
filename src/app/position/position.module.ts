import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {PositionComponent} from "./position.component";
import {PositionListComponent} from "./position-list.component";
import {StoreModule} from "../store/store.module";
import {ProductModule} from "../product/product.module";
import {PositionService} from "../services/core/position.service";
import {GenericModule} from "../generic/generic.module";

@NgModule({
    imports: [
        CommonModule,
        StoreModule,
        FormsModule,
        GenericModule,
        ProductModule
    ],
    declarations: [
        PositionComponent,
        PositionListComponent
    ],
    exports: [
        PositionListComponent
    ],
    providers: [
        PositionService
    ]
})
export class PositionModule {}
