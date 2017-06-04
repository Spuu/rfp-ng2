import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Invoice, InvoiceType} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {HashService} from "../services/common/hash.service";
import {HalSerializer} from "../services/hal-serializer.service";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {Store} from "../resources/store.resource";
import {Counterparty} from "../resources/counterparty.resource";

@Component({
    templateUrl: './invoice-detail-form.component.html'
})
export class InvoiceDetailFormComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Dane Faktury';
    invoice: Invoice;
    errorMessage: string;
    invoiceForm: FormGroup;

    private sub:any;

    constructor(private invoiceService:InvoiceService,
                private router:Router,
                private route:ActivatedRoute,
                private hashService: HashService,
                private formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let url = this.hashService.unhash(params['id']);
            this.getInvoice(url);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async getInvoice(url:string) {
        this.invoice = await this.invoiceService.get(url);
        this.ngOnChanges();
    }

    gotoInvoices() {
        this.router.navigate(['/invoice']);
    }

    async onSubmit() {
        this.invoice = this.prepareSaveInvoice();
        await this.invoice.update();
        this.gotoInvoices();
    }

    async onDelete() {
        this.invoice.delete();
        this.invoice = null;
        this.gotoInvoices();
    }

    showItems():boolean {
        if(this.invoice && !!this.invoice.uri && !!this.invoice.store)
            return true;

        return false;
    }

    createForm() {
        this.invoiceForm = this.formBuilder.group({
            name: ['', Validators.required ],
            type: ['', Validators.required ],
            documentDate: ['', Validators.required ],
            store: ['', Validators.required ],
            counterparty: ['', Validators.required ]
        });
    }

    ngOnChanges() {
        this.invoiceForm.reset({
            name: this.invoice.name,
            type: this.invoice.type,
            documentDate: this.invoice.documentDate,
            store: this.invoice.store,
            counterparty: this.invoice.counterparty,
        });
    }

    prepareSaveInvoice(): Invoice {
        const formModel = this.invoiceForm.value;

        this.invoice.name = formModel.name;
        this.invoice.type = formModel.type;
        this.invoice.documentDate = formModel.documentDate;
        this.invoice.store = formModel.store;
        this.invoice.counterparty = formModel.counterparty;

        return this.invoice;
    }

    revert() { this.ngOnChanges(); }
}
