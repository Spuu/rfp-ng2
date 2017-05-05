import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CounterpartyService} from '../services/core/counterparty.service';
import {HashService} from "../services/common/hash.service";
import {Counterparty} from "../resources/counterparty.resource";

@Component({
    templateUrl: 'counterparty-detail-form.component.html'
})
export class CptyDetailFormComponent implements OnInit, OnDestroy {
    pageTitle:string = 'Dane kontrahenta';
    counterparty:Counterparty;
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
            this.getCounterparty(url);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async getCounterparty(url:string) {
        this.counterparty = await this.cptyService.get(url);
    }

    async onSubmit() {
        await this.counterparty.update();
        this.gotoCpties();
    }

    async onDelete() {
        this.counterparty.delete();
        this.counterparty = null;
        this.gotoCpties();
    }

    gotoCpties() {
        this.router.navigate(['/counterparty']);
    }
}
