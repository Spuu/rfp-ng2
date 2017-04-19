import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CounterpartyService} from './counterparty.service';
import {HashService} from "../services/hash.service";
import {CounterpartyResource} from "./counterparty.resource";

@Component({
    templateUrl: 'counterparty-detail-form.component.html'
})
export class CptyDetailFormComponent implements OnInit, OnDestroy {
    pageTitle:string = 'Dane kontrahenta';
    counterparty:CounterpartyResource;
    errorMessage:string;

    private sub:any;

    constructor(private cptyService:CounterpartyService,
                private router:Router,
                private route:ActivatedRoute,
                private hashService: HashService) {
    }


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let url = this.hashService.unhash(params['id']);
            console.log(url);
            this.getCounterparty(url);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async getCounterparty(url:string) {
        this.counterparty = await this.cptyService.get(url);
    }

    gotoCpties() {
        this.router.navigate(['/counterparty']);
    }



    async putCounterparty(cpty:CounterpartyResource) {
        this.counterparty = await cpty.update();
    }

    delCpty(cpty:CounterpartyResource) {
        cpty.delete();
        this.counterparty = null;
        /*this._cptyService.del(id)
            .subscribe(
                data => {},
                error => this.errorMessage = <any>error,
                () => this.gotoCpties()
            );*/
    }

    onSubmit() {
        this.putCounterparty(this.counterparty);
    }

    onDelete() {
        this.delCpty(this.counterparty);
        this.gotoCpties();
    }
}
