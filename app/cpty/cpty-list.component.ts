import { Component, OnInit }  from '@angular/core';
import { Router } from '@angular/router';

import {ICpty} from './cpty';
import {CptyService} from './cpty.service';
import {Logger} from "angular2-logger/core";

@Component({
    templateUrl: 'app/cpty/cpty-list.component.html'
})
export class CptyListComponent implements OnInit {
    pageTitle: string = 'Kontrahenci';
    cpties: ICpty[];
    errorMessage: string;

    constructor(private _cptyService: CptyService,
                private _router: Router,
                private _logger: Logger) {

    }

    ngOnInit(): void {
        this._cptyService.getCpties()
            .subscribe(
                cpties => this.cpties = cpties,
                error =>  this.errorMessage = <any>error);
    }

    onSelect(cpty: ICpty) {
        this._router.navigate(['/cpty', cpty._id]);
    }
}
