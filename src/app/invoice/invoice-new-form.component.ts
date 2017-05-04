import {Component, OnInit, Input, Output, EventEmitter}  from '@angular/core';
import {Router} from '@angular/router';

import {CounterpartyService} from "../services/core/counterparty.service";
import {StoreService} from "../services/core/store.service";
import {Counterparty} from "../resources/counterparty.resource";
import {Store} from "../resources/store.resource";
import {Invoice} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";

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
    counterparties: Counterparty[];

    @Input() type: string = 'Buy';
    @Output() invoiceSubmitted: EventEmitter<Invoice> = new EventEmitter<Invoice>();

    constructor(private _invoiceService:InvoiceService,
                private _cptyService:CounterpartyService,
                private _storeService:StoreService) {
    }

    ngOnInit():void {
        /*this._cptyService.getList()
            .subscribe(
                cpties => this.cpties = cpties.docs,
                error => this.errorMessage = <any>error
            );*/

        // this._storeService.getList()
        //     .subscribe(
        //         stores => this.stores = stores.docs,
        //         error => this.errorMessage = <any>error
        //     );

        this.model = this._invoiceService.getEmpty();
    }

    onSubmit() {
        // this._invoiceService.post(this.model)
        //     .subscribe(
        //     invoice => {
        //         this.invoiceSubmitted.emit(invoice);
        //         this.model = this._invoiceService.getEmpty();
        //         this.active = false;
        //         setTimeout(() => this.active = true, 0);
        //     },
        //     error => {this.errorMessage = error; console.log(error);});
    }
}
