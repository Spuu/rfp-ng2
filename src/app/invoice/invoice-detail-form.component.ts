import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Invoice} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {HashService} from "../services/common/hash.service";

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
        this.route.params
            .map((params: Params) => this.hashService.unhash(params['id']))
            .map(url => this.invoiceService.get(url))
            .subscribe(invoice => invoice.then((data) => { this.invoice = data; console.log(data);} ));
    }

    ngOnDestroy() {
    }

    onInvoiceSubmitted(invoice: Invoice) {
        this.invoice = invoice;
        this.router.navigate(['/invoice']);
    }

    gotoInvoices() {
        this.router.navigate(['/invoice']);
    }

    showItems():boolean {
        if(this.invoice && !!this.invoice.uri && !!this.invoice.store)
            return true;

        return false;
    }
}
