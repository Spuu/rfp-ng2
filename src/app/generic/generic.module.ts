import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import {ModalConfirmationButton} from "./modal-confirmation-button.component";
import {ButtonModule} from "primeng/components/button/button";
import {DialogModule} from "primeng/components/dialog/dialog";

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule
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
