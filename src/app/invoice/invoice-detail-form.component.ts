import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Invoice, InvoiceType} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {HashService} from "../services/common/hash.service";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";

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

            // this.route.params
            // .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            // .subscribe(hero => this.hero = hero);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async getInvoice(url:string) {
        this.invoice = await this.invoiceService.get(url);
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
