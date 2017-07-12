import {Component, OnInit, Input, Output, EventEmitter, OnChanges}  from '@angular/core';

import {CounterpartyService} from "../services/core/counterparty.service";
import {StoreService} from "../services/core/store.service";
import {Counterparty} from "../resources/counterparty.resource";
import {Store} from "../resources/store.resource";
import {Invoice, InvoiceType} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {SelectItem} from "primeng/components/common/api";
import {resetCache} from "hal-rest-client";
import {DateService} from "../services/common/date.service";

import * as _ from "lodash";

@Component({
    selector: 'invoice-form',
    templateUrl: 'invoice-form.component.html'
})
export class InvoiceFormComponent implements OnInit, OnChanges {
    invoiceForm: FormGroup;
    stores: Store[];
    counterparties: Counterparty[];

    isStateful: boolean;

    invoiceType: SelectItem[];

    @Input() model: Invoice;
    @Output() invoiceSubmitted: EventEmitter<Invoice> = new EventEmitter<Invoice>();

    constructor(private invoiceService: InvoiceService,
                private counterpartyService: CounterpartyService,
                private storeService: StoreService,
                private dateService: DateService,
                private formBuilder: FormBuilder) {
        this.createForm();
        this.setupInvoiceType();
    }

    createForm() {
        this.invoiceForm = this.formBuilder.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            documentDate: ['', Validators.required],
            store: ['', Validators.required],
            counterparty: ['', Validators.required]
        });
    }

    setupInvoiceType() {
        this.invoiceType = [];
        this.invoiceType.push({label: "Buy", value: InvoiceType.BUY});
        this.invoiceType.push({label: "Sell", value: InvoiceType.SELL});
    }

    ngOnInit() {
        this.isStateful = true;

        if (!this.model) {
            this.isStateful = false;
            this.model = this.invoiceService.getEmpty();
        }

        this.loadSatelites().then(() => this.ngOnChanges())
    }

    async loadSatelites() {
        resetCache();
        await Promise.all([
            this.model.store.fetch(),
            this.model.counterparty.fetch(),
            this.storeService.getList().then((data) => this.stores = data),
            this.counterpartyService.getList().then((data) => this.counterparties = data)
        ]);
    }

    ngOnChanges(): void {
        let docDate = this.dateService.getDateAsString();

        if (this.model.documentDate)
            docDate = this.dateService.getDateAsString(this.model.documentDate);

        this.invoiceForm.reset({
            name: this.model.name,
            type: this.model.type,
            documentDate: docDate,
            store: this.model.store.uri,
            counterparty: this.model.counterparty.uri,
        });

        console.log(this.model);
    }

    async onSubmit() {
        await this.updateModel();
        this.invoiceSubmitted.emit(this.model);

        if (!this.isStateful)
            this.model = this.invoiceService.getEmpty();
    }

    onDelete() {
        this.model.delete();
        this.model = this.invoiceService.getEmpty();
    }

    async updateModel() {
        const formModel = this.invoiceForm.value;

        this.model.name = formModel.name;
        this.model.type = formModel.type;
        this.model.documentDate = this.dateService.getDateFromString(formModel.documentDate);
        this.model.store = _.find(this.stores, { uri: formModel.store});
        this.model.counterparty = _.find(this.counterparties, { uri: formModel.counterparty });
        this.model.categories = null;
        this.model.positions = null;
        await this.model.update();
    }

    revert() {
        this.ngOnChanges();
    }
}
