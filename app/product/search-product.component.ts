import {Component, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ProductService} from "./product.service";
import {Product} from "./product";

@Component({
    selector: 'search-product',
    directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES],
    templateUrl: 'app/product/search-product.component.html'
})
export class SearchProductComponent {
    @Output() productSelected = new EventEmitter();

    public dataSource:Observable<Product[]>;
    public asyncSelected:string;
    public isLoading:boolean = false;
    public noResults:boolean = false;

    private getAsyncSelected = function () {
        return this.asyncSelected;
    };

    constructor(private _productService:ProductService) {
        this.dataSource = Observable.create((observer:any) => {
            this._productService.search(this.getAsyncSelected(), 5)
                .subscribe(p => {
                    observer.next(p);
                });
        });
    }


    public changeLoading(e:boolean):void {
        this.isLoading = e;
    }

    public changeNoResults(e:boolean):void {
        this.noResults = e;
    }

    public onSelect(e:any):void {
        this.productSelected.emit(e.item);
        this.asyncSelected = '';
    }
}

