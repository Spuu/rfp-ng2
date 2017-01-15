import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Invoice} from './invoice';
import {InvoiceService} from './invoice.service';
import {InvoiceNewFormComponent} from "./invoice-new-form.component";

@Component({
    templateUrl: 'app/invoice/invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {
    pageTitle:string = 'Faktury';
    invoices:Invoice[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Invoice = new Invoice();

    constructor(private _invoiceService:InvoiceService,
                private _router:Router) {
    }

    ngOnInit():void {
        this._invoiceService.getList()
            .subscribe(
                invoices => this.invoices = invoices,
                error => this.errorMessage = <any>error);
    }

    onSelect(invoice:Invoice) {
        this._router.navigate(['/invoice', invoice._id]);
    }

    onSubmit(invoice:Invoice) {
        this.invoices.push(invoice);
        this.onSelect(invoice);
    }
}
