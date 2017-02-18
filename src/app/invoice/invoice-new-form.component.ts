import {Component, OnInit, Input, Output, EventEmitter}  from '@angular/core';
import {Router} from '@angular/router';

import {Invoice} from './invoice';
import {InvoiceService} from './invoice.service';
import {CptyService} from "../cpty/cpty.service";
import {StoreService} from "../store/store.service";
import {Store} from "../store/store";
import {Cpty} from "../cpty/cpty";

@Component({
    selector: 'invoice-new-form',
    templateUrl: './invoice-new-form.component.html'
})
export class InvoiceNewFormComponent implements OnInit {
    pageTitle: string = 'Nowa faktura';
    errorMessage: string;
    active: boolean = true;
    model: Invoice;
    stores: Store[];
    cpties: Cpty[];

    @Input() type: string = 'Buy';
    @Output() invoiceSubmitted: EventEmitter<Invoice> = new EventEmitter<Invoice>();

    constructor(private _invoiceService:InvoiceService,
                private _cptyService:CptyService,
                private _storeService:StoreService) {
    }

    ngOnInit():void {
        this._cptyService.getList()
            .subscribe(
                cpties => this.cpties = cpties.docs,
                error => this.errorMessage = <any>error
            );

        this._storeService.getList()
            .subscribe(
                stores => this.stores = stores.docs,
                error => this.errorMessage = <any>error
            );

        this.model = new Invoice();
    }

    onSubmit() {
        this._invoiceService.post(this.model)
            .subscribe(
            invoice => {
                this.invoiceSubmitted.emit(invoice);
                this.model = new Invoice();
                this.active = false;
                setTimeout(() => this.active = true, 0);
            },
            error => {this.errorMessage = error; console.log(error);});
    }
}
