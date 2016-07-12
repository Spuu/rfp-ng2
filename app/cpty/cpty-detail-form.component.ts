import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

import {ICpty} from './cpty';
import {CptyService} from './cpty.service';

@Component({
    templateUrl: 'app/cpty/cpty-detail-form.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class CptyDetailFormComponent implements OnInit, OnDestroy {
    pageTitle:string = 'Dane kontrahenta';
    cpty:ICpty;
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
        this._cptyService.getCpty(id)
            .subscribe(
                cpty => this.cpty = cpty,
                error => this.errorMessage = <any>error
            );
    }

    gotoCpties() {
        this._router.navigate(['/cpty']);
    }

    putCpty(cpty:ICpty) {
        this._cptyService.putCpty(cpty)
            .subscribe(
                cpty => this.cpty = cpty,
                error => this.errorMessage = <any>error
            );
    }

    onSubmit() {
        this.putCpty(this.cpty);
    }
}