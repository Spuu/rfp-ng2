import {Component, OnInit, Input, Output, EventEmitter, OnChanges}  from '@angular/core';

import {CounterpartyService} from "../services/core/counterparty.service";
import {StoreService} from "../services/core/store.service";
import {Counterparty} from "../resources/counterparty.resource";
import {Store} from "../resources/store.resource";
import {Invoice, InvoiceType} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {SelectItem} from "primeng/components/common/api";
import * as moment from "moment-timezone";
import {DbRefUpdaterService} from "../services/db-ref-updater.service";
import {resetCache} from "hal-rest-client";

@Component({
    selector: 'invoice-form',
    templateUrl: 'invoice-form.component.html'
})
export class InvoiceFormComponent implements OnInit, OnChanges {
    invoiceForm: FormGroup;
    stores: Promise<Store[]>|null = null;
    counterparties: Promise<Counterparty[]>|null = null;

    isStateful: boolean;

    invoiceType: SelectItem[];

    DATE_FORMAT: string = 'DD.MM.YYYY';

    @Input() model: Invoice;
    @Output() invoiceSubmitted: EventEmitter<Invoice> = new EventEmitter<Invoice>();

    constructor(private invoiceService: InvoiceService,
                private counterpartyService: CounterpartyService,
                private storeService: StoreService,
                private dbRefUpdater: DbRefUpdaterService,
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

        this.stores = this.storeService.getList();
        this.counterparties = this.counterpartyService.getList();

        this.loadSatelites().then(() => this.ngOnChanges())
    }

    async loadSatelites() {
        resetCache();
        await Promise.all([
            this.model.store.fetch(),
            this.model.counterparty.fetch()
        ]);
    }

    ngOnChanges(): void {
        let docDate = moment().format(this.DATE_FORMAT);

        if (this.model.documentDate)
            docDate = moment(this.model.documentDate).format(this.DATE_FORMAT);

        this.invoiceForm.reset({
            name: this.model.name,
            type: this.model.type,
            documentDate: docDate,
            store: this.model.store.uri,
            counterparty: this.model.counterparty.uri,
        });
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
        this.model.documentDate = moment.tz(formModel.documentDate, this.DATE_FORMAT, "UTC"); // TODO: date service

        await this.dbRefUpdater.update(this.model.store.origUri, formModel.store);
        await this.dbRefUpdater.update(this.model.counterparty.origUri, formModel.counterparty);
        await this.model.update();

        // reload full invoice
        this.model = await this.invoiceService.get(this.model.uri);
        await this.loadSatelites();
    }

    revert() {
        this.ngOnChanges();
    }
}
