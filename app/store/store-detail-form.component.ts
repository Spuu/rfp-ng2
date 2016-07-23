import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

import {Store} from './store';
import {StoreService} from './store.service';

@Component({
    templateUrl: 'app/store/store-detail-form.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class StoreDetailFormComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Dane Sklepu';
    store: Store;
    errorMessage: string;

    private sub:any;

    constructor(private _storeService:StoreService,
                private _router:Router,
                private _route:ActivatedRoute) {
    }


    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            let id = params['id'];
            this.getStore(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getStore(id:string) {
        this._storeService.get(id)
            .subscribe(
                store => this.store = store,
                error => this.errorMessage = <any>error
            );
    }

    gotoStores() {
        this._router.navigate(['/store']);
    }

    putStore(store:Store) {
        this._storeService.put(store)
            .subscribe(
                store => this.store = store,
                error => this.errorMessage = <any>error
            );
    }

    delStore(id:string) {
        this._storeService.del(id)
            .subscribe(
                data => {},
                error => this.errorMessage = <any>error,
                () => this.gotoStores()
            );
    }

    onSubmit() {
        this.putStore(this.store);
    }

    onDelete() {
        this.delStore(this.store._id);
        this.gotoStores();
    }
}