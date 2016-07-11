import { Component, OnInit }  from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ICpty } from './cpty';
import { CptyService } from './cpty.service';

@Component({
    templateUrl: 'app/cpty/cpty-list.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class CptyListComponent implements OnInit {
    pageTitle: string = 'Kontrahenci';
    cpties: ICpty[];
    errorMessage: string;

    constructor(private _cptyService: CptyService) {

    }

    ngOnInit(): void {
        this._cptyService.getCpties()
            .subscribe(
                cpties => this.cpties = cpties,
                error =>  this.errorMessage = <any>error);
    }
}
