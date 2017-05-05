import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {InvoiceNewFormComponent} from "./invoice-new-form.component";
import {Invoice} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";

@Component({
    templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {
    pageTitle:string = 'Faktury';
    invoices:Invoice[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Invoice = this._invoiceService.getEmpty();

    constructor(private _invoiceService:InvoiceService,
                private _router:Router) {
    }

    ngOnInit():void {
        this._invoiceService.getList().then((data) => this.invoices = data.invoices);
    }

    onSelect(invoice:Invoice) {
        //this._router.navigate(['/invoice', invoice._id]);
    }

    onSubmit(invoice:Invoice) {
        this.invoices.push(invoice);
        this.onSelect(invoice);
    }
}
