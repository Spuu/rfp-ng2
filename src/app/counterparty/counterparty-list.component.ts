import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {CounterpartyService} from '../services/core/counterparty.service';
import {Logger} from "../services/common/logger.service";
import {Counterparty} from "../resources/counterparty.resource";
import {HashService} from "../services/common/hash.service";

@Component({
    templateUrl: 'counterparty-list.component.html'
})
export class CounterpartyListComponent implements OnInit {
    pageTitle:string = 'Kontrahenci';
    counterparties: Counterparty[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Counterparty;

    constructor(private counterpartyService:CounterpartyService,
                private router:Router,
                private logger:Logger,
                private hashService: HashService) {}

    ngOnInit():void {
        this.model = this.counterpartyService.getEmpty();
        this.counterpartyService.getList().then((data) => this.counterparties = data);
    }

    onSelect(cpty:Counterparty) {
        this.router.navigate(['/counterparty', this.hashService.hash(cpty.uri)]);
    }

    onSubmit() {
        this.counterpartyService.post(this.model)
            .then(
                (cpty) => {
                    this.counterparties.push(cpty);
                    this.model = this.counterpartyService.getEmpty();
                    this.showNewForm = false;
                }
            ).catch(
            (error) =>
                this.errorMessage = <any>error
        );
    }
}
