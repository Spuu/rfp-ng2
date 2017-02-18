import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';

import {Cpty} from './cpty';
import {CptyService} from './cpty.service';
import {Logger} from "../generic/logger.service";

@Component({
    templateUrl: './cpty-list.component.html'
})
export class CptyListComponent implements OnInit {
    pageTitle:string = 'Kontrahenci';
    cpties:Cpty[];
    errorMessage:string;
    showNewForm:boolean = false;
    model:Cpty = new Cpty();

    constructor(private _cptyService:CptyService,
                private _router:Router,
                private _logger:Logger) {

    }

    ngOnInit():void {
        this._cptyService.getList()
            .subscribe(
                cpties => this.cpties = cpties.docs,
                error => this.errorMessage = <any>error);
    }

    onSelect(cpty:Cpty) {
        this._router.navigate(['/cpty', cpty._id]);
    }

    onSubmit() {
        this._cptyService.post(this.model).subscribe(
            cpty => {
                this.cpties.push(cpty);
                this.model = new Cpty();
                this.showNewForm = false;
            },
            error => this.errorMessage = <any>error);
    }
}
