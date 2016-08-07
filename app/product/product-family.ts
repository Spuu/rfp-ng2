import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {ProductService} from "./product.service";
import {Product} from "./product";

@Component({
    selector: 'product-family',
    directives: [SearchProductComponent],
    templateUrl: 'app/product/product-family.html'
})
export class SearchProductComponent {
    @Input() father: string;
    @Input() child: string;
    @Output() onClose = new EventEmitter();

    public dataSource:Observable<Product[]>;
    public asyncSelected:string;
    public isLoading:boolean = false;
    public noResults:boolean = false;

    private getAsyncSelected = function() { return this.asyncSelected; };

    constructor(private _productService:ProductService) {
        this.dataSource = Observable.create((observer:any) => {
            this._productService.search(this.getAsyncSelected(), 5).subscribe(p => observer.next(p));
        });
    }


    public changeLoading(e:boolean):void {
        this.isLoading = e;
    }

    public changeNoResults(e:boolean):void {
        this.noResults = e;
    }

    public onSave():void {
        this.onClose.emit(true);
    }

    public onCancel():void {
        this.onClose.emit(false);
    }
}

/**
 * Created by spuu on 31.07.16.
 */
