import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Invoice} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {HashService} from "../services/common/hash.service";
import {HalSerializer} from "../services/hal-serializer.service";

@Component({
    templateUrl: './invoice-detail-form.component.html'
})
export class InvoiceDetailFormComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Dane Faktury';
    invoice: Invoice;
    errorMessage: string;

    private sub:any;

    constructor(private invoiceService:InvoiceService,
                private router:Router,
                private route:ActivatedRoute,
                private hashService: HashService) {
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
        console.log(this.invoice);
    }

    gotoInvoices() {
        this.router.navigate(['/invoice']);
    }

    async onSubmit() {
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
}
