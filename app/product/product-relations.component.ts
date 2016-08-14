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
    fatherId:string;

    @Input()
    childId:string;

    @Output()
    onClose = new EventEmitter();

    isFatherSet:boolean = false;
    isChildSet:boolean = false;

    constructor(private _productService:ProductService) {
        if (this.fatherId)
            this.isFatherSet = true;

        if (this.childId)
            this.isChildSet = true;
    }

    public onLink():void {
        if (this.fatherId && this.childId) {
            this._productService.add_child(this.fatherId, this.childId)
                .subscribe(
                    p => this.onClose.emit(true),
                    err => console.log("ProductRelationsComponent error: " + err)
                );
        } else {
            console.log("Link: data not ready.");
        }
    }

    public onUnlink():void {

        if (this.fatherId && this.childId) {
            this._productService.remove_child(this.fatherId, this.childId)
                .subscribe(
                    p => this.onClose.emit(true),
                    err => console.log("ProductRelationsComponent error: " + err)
                );
        } else {
            console.log("Unlink: data not ready.");
        }
    }

    public onCancel():void {
        this.onClose.emit(false);
    }
}

