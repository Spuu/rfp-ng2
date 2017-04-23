import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreResource} from './store.resource';
import {StoreService} from './store.service';
import {HashService} from "../services/hash.service";

@Component({
    templateUrl: './store-detail-form.component.html'
})
export class StoreDetailFormComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Dane Sklepu';
    store: StoreResource;
    errorMessage: string;

    private sub:any;

    constructor(private storeService:StoreService,
                private router:Router,
                private route:ActivatedRoute,
                private hashService: HashService) {
    }


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let url = this.hashService.unhash(params['id']);
            this.getStore(url);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async getStore(url:string) {
        this.store = await this.storeService.get(url);
    }

    gotoStores() {
        this.router.navigate(['/store']);
    }

    async onSubmit() {
        await this.store.update();
        this.gotoStores();
    }

    async onDelete() {
        this.store.delete();
        this.store = null;
        this.gotoStores();
    }
}
