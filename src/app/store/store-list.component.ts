import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Store} from './store';
import {StoreService} from './store.service';

@Component({
    templateUrl: './store-list.component.html'
})
export class StoreListComponent implements OnInit {
    pageTitle:string = 'Sklepy';
    stores:Store[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Store = new Store();

    constructor(private _storeService:StoreService,
                private _router:Router) {

    }

    ngOnInit():void {
        this._storeService.getList()
            .subscribe(
                stores => this.stores = stores,
                error => this.errorMessage = <any>error);
    }

    onSelect(store:Store) {
        this._router.navigate(['/store', store._id]);
    }

    onSubmit() {
        this._storeService.post(this.model).subscribe(
            store => {
                this.stores.push(store);
                this.model = new Store();
                this.showNewForm = false;
            },
            error => this.errorMessage = <any>error);
    }
}
