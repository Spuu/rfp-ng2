import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'modal-confirm-button',
    templateUrl: './modal-confirmation-button.component.html'
})
export class ModalConfirmationButton {
    @Input()
    title:string;

    @Output()
    onConfirm = new EventEmitter();

    constructor() {

    }

    confirm() {
        this.onConfirm.emit(true);
    }
}
