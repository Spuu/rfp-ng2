import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Invoice} from "../resources/invoice.resource";
import {InvoiceService} from "../services/core/invoice.service";
import {HashService} from "../services/common/hash.service";

@Component({
    templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {
    pageTitle:string = 'Faktury';
    invoices:Invoice[];
    errorMessage:string;
    showNewForm:boolean = false;

    constructor(private invoiceService:InvoiceService,
                private router:Router,
                private hashService: HashService) {
    }

    ngOnInit():void {
        this.invoiceService.getList().then((data) => this.invoices = data.invoices);
    }

    onSelect(invoice:Invoice) {
        this.router.navigate(['/invoice', this.hashService.hash(invoice.uri)]);
    }

    onSubmit(invoice:Invoice) {
        this.invoices.push(invoice);
        this.onSelect(invoice);
    }
}
