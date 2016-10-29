import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {SubPositionComponent} from "./sub-position.component";
import {SubPositionService} from "./sub-position.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        SubPositionComponent,
    ],
    exports: [
        SubPositionComponent,
    ],
    providers: [
        SubPositionService
    ]
})
export class SubPositionModule {}