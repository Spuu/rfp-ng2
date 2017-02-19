import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import {DialogModule} from 'primeng/primeng';
import {ModalConfirmationButton} from "./modal-confirmation-button.component";

@NgModule({
    imports: [
        CommonModule,
        DialogModule
    ],
    declarations: [
        ModalConfirmationButton
    ],
    exports: [
        ModalConfirmationButton
    ],
    providers: [ ]
})
export class GenericModule {}
