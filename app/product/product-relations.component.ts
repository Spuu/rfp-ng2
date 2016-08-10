import {Component, Input, Output, EventEmitter} from '@angular/core';

import {SearchProductComponent} from "./search-product-component";
import {ProductService} from "./product.service";

@Component({
    selector: 'product-family',
    directives: [SearchProductComponent],
    templateUrl: 'app/product/product-relations.component.html'
})
export class ProductRelationsComponent {
    @Input()
    father:string;

    @Input()
    child:string;

    @Output()
    onClose = new EventEmitter();

    isFatherSet:boolean = false;
    isChildSet:boolean = false;

    constructor(private _productService:ProductService) {
        if (this.father)
            this.isFatherSet = true;

        if (this.child)
            this.isChildSet = true;
    }

    public onLink():void {
        this._productService.add_child(this.father, this.child)
            .subscribe(
                p => this.onClose.emit(true),
                err => console.log("ProductRelationsComponent error: " + err)
            );
    }

    public onUnlink():void {
        this._productService.remove_child(this.father, this.child)
            .subscribe(
                p => this.onClose.emit(true),
                err => console.log("ProductRelationsComponent error: " + err)
            );
    }

    public onCancel():void {
        this.onClose.emit(false);
    }
}

/**
 * Created by spuu on 31.07.16.
 */
