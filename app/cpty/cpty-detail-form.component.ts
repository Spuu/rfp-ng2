import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

import {Cpty} from './cpty';
import {CptyService} from './cpty.service';

@Component({
    templateUrl: 'app/cpty/cpty-detail-form.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class CptyDetailFormComponent implements OnInit, OnDestroy {
    pageTitle:string = 'Dane kontrahenta';
    cpty:Cpty;
    errorMessage:string;

    private sub:any;

    constructor(private _cptyService:CptyService,
                private _router:Router,
                private _route:ActivatedRoute) {
    }


    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            let id = params['id'];
            this.getCpty(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getCpty(id:string) {
        this._cptyService.get(id)
            .subscribe(
                cpty => this.cpty = cpty,
                error => this.errorMessage = <any>error
            );
    }

    gotoCpties() {
        this._router.navigate(['/cpty']);
    }

    putCpty(cpty:Cpty) {
        this._cptyService.put(cpty)
            .subscribe(
                cpty => this.cpty = cpty,
                error => this.errorMessage = <any>error
            );
    }

    delCpty(id:string) {
        this._cptyService.del(id)
            .subscribe(
                data => {},
                error => this.errorMessage = <any>error,
                () => this.gotoCpties()
            );
    }

    onSubmit() {
        this.putCpty(this.cpty);
    }

    onDelete() {
        this.delCpty(this.cpty._id);
        this.gotoCpties();
    }
}