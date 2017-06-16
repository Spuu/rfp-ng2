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

        this.loadSatelites().then(() => this.ngOnChanges())
    }

    async loadSatelites() {
        this.counterpartyService.getList().then((data) => this.counterparties = data);
        this.storeService.getList().then((data) => this.stores = data);
        await this.model.store.fetch();
        await this.model.counterparty.fetch();
    }

    ngOnChanges(): void {
        let docDate = moment.tz("Europe/Warsaw").format('L');

        if (this.model.documentDate)
            docDate = moment.tz(this.model.documentDate, "UTC").format('L');

        this.invoiceForm.reset({
            name: this.model.name,
            type: this.model.type,
            documentDate: docDate,
            store: this.model.store.uri,
            counterparty: this.model.counterparty.uri,
        });

        console.log(this.invoiceForm);
    }

    async onSubmit() {
        await this.updateModel();

        console.log("emit invoice");
        this.invoiceSubmitted.emit(this.model);

        if (!this.isStateful)
            this.model = this.invoiceService.getEmpty();
    }

    async onDelete() {
        this.model.delete();
        this.model = this.invoiceService.getEmpty();
    }

    async updateModel() {
        const formModel = this.invoiceForm.value;

        this.dbRefUpdater.update(this.model.store.origUri, formModel.store);

        this.model.name = formModel.name;
        this.model.type = formModel.type;
        this.model.documentDate = new Date(formModel.documentDate);

        await this.model.update();

        this.invoiceService.get(this.model.uri).then((data) => this.model = data);
        console.log("get invoice");
    }

    revert() {
        this.ngOnChanges();
    }
}
