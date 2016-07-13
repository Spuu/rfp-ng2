import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Store} from './store';
import {StoreService} from './store.service';
import {Logger} from "angular2-logger/core";

@Component({
    templateUrl: 'app/store/store-list.component.html'
})
export class StoreListComponent implements OnInit {
    pageTitle:string = 'Sklepy';
    stores:Store[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Store = new Store();

    constructor(private _storeService:StoreService,
                private _router:Router,
                private _logger:Logger) {

    }

    ngOnInit():void {
        this._storeService.getStores()
            .subscribe(
                stores => this.stores = stores,
                error => this.errorMessage = <any>error);
    }

    onSelect(store:Store) {
        this._router.navigate(['/store', store._id]);
    }

    onSubmit() {
        this._storeService.postStore(this.model).subscribe(
            store => {
                this.stores.push(store);
                this.model = new Store();
                this.showNewForm = false;
            },
            error => this.errorMessage = <any>error);
    }
}
