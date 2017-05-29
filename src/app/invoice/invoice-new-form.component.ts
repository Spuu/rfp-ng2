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

    constructor(private invoiceService: InvoiceService,
                private counterpartyService: CounterpartyService,
                private storeService: StoreService) {
    }

    ngOnInit(): void {
        this.counterpartyService.getList().then((data) => this.counterparties = data);
        this.storeService.getList().then((data) => this.stores = data);

        this.model = this.invoiceService.getEmpty();
    }

    onSubmit() {
        this.invoiceService.post(this.model).then((data) => {
            this.invoiceSubmitted.emit(data);
            this.model = this.invoiceService.getEmpty();
            this.active = false;
            setTimeout(() => this.active = true, 0);
        });
    }
}
