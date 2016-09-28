import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {PositionSellComponent} from "./position-sell.component";
import {PositionSellService} from "./position-sell.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PositionSellComponent,
    ],
    exports: [
        PositionSellComponent,
    ],
    providers: [
        PositionSellService
    ]
})
export class PositionSellModule {}