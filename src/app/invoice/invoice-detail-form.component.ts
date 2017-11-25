import {Invoice} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {HashService} from "../services/common/hash.service";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params, ParamMap} from "@angular/router";
import 'rxjs/add/operator/switchMap';

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
        this.route.paramMap
            .switchMap((params: ParamMap) => this.hashService.unhash(params.get('id')))
            .switchMap(url => this.invoiceService.get(url))
            .subscribe(invoice => this.invoice = invoice);
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
