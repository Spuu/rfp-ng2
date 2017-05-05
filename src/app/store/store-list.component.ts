import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '../resources/store.resource';
import {StoreService} from '../services/core/store.service';
import {Logger} from "../services/common/logger.service";
import {HashService} from "../services/common/hash.service";

@Component({
    templateUrl: './store-list.component.html'
})
export class StoreListComponent implements OnInit {
    pageTitle:string = 'Sklepy';
    stores:Store[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Store;

    constructor(private storeService:StoreService,
                private router:Router,
                private logger:Logger,
                private hashService: HashService) {}

    ngOnInit():void {
        this.model = this.storeService.getEmpty();
        this.storeService.getList().then((data) => this.stores = data);
    }

    onSelect(store:Store) {
        this.router.navigate(['/store', this.hashService.hash(store.uri)]);
    }

    onSubmit() {
        this.storeService.post(this.model)
            .then(
                (store) => {
                    this.stores.push(store);
                    this.model = this.storeService.getEmpty();
                    this.showNewForm = false;
                }
            ).catch(
            (error) =>
                this.errorMessage = <any>error
        );
    }
}
