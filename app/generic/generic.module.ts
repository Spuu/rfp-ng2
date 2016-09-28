import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import {ModalConfirmationButton} from "./modal-confirmation-button.component";

@NgModule({
    imports: [
        CommonModule
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