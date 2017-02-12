import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Invoice} from './invoice';
import {InvoiceService} from './invoice.service';
import {PositionListComponent} from "../position/position-list.component";

@Component({
    templateUrl: './invoice-detail-form.component.html'
})
export class InvoiceDetailFormComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Dane Faktury';
    invoice: Invoice;
    errorMessage: string;

    private sub:any;

    constructor(private _invoiceService:InvoiceService,
                private _router:Router,
                private _route:ActivatedRoute) {
    }


    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            let id = params['id'];
            this.getInvoice(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getInvoice(id:string) {
        this._invoiceService.get(id)
            .subscribe(
                invoice => this.invoice = invoice,
                error => this.errorMessage = <any>error
            );
    }

    gotoInvoices() {
        this._router.navigate(['/invoice']);
    }

    putInvoice(invoice:Invoice) {
        this._invoiceService.put(invoice)
            .subscribe(
                invoice => this.invoice = invoice,
                error => this.errorMessage = <any>error
            );
    }

    delInvoice(id:string) {
        this._invoiceService.del(id)
            .subscribe(
                data => {},
                error => this.errorMessage = <any>error,
                () => this.gotoInvoices()
            );
    }

    onSubmit() {
        this.putInvoice(this.invoice);
    }

    onDelete() {
        this.delInvoice(this.invoice._id);
        this.gotoInvoices();
    }

    showItems():boolean {
        if(this.invoice && !!this.invoice._id && !!this.invoice._store)
            return true;

        return false;
    }
}
