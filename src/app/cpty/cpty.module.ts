import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {CptyListComponent} from "./cpty-list.component";
import {CptyDetailFormComponent} from "./cpty-detail-form.component";
import {CptyService} from "./cpty.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        CptyListComponent,
        CptyDetailFormComponent,
    ],
    exports: [
        CptyListComponent
    ],
    providers: [CptyService]
})
export class CptyModule {}