import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import {ProductService} from "./product.service";
import {Product} from "./product";

@Component({
    selector: 'product-family',
    templateUrl: 'app/product/product-relations.component.html'
})
export class ProductRelationsComponent implements OnInit {
    @Input()
    father:Product;

    @Input()
    child:Product;

    @Output()
    onClose = new EventEmitter();

    isFatherSet:boolean = false;
    isChildSet:boolean = false;

    constructor(private _productService:ProductService) {
    }

    ngOnInit() {
        if (this.father)
            this.isFatherSet = true;

        if (this.child)
            this.isChildSet = true;
    }

    public onLink():void {
        if (this.father && this.child) {
            this._productService.add_child(this.father._id, this.child._id)
                .subscribe(
                    p => this.onClose.emit(true),
                    err => console.log("ProductRelationsComponent error: " + err)
                );
        } else {
            console.log("Link: data not ready.");
        }
    }

    public onUnlink():void {

        if (this.father._id && this.child._id) {
            this._productService.remove_child(this.father._id, this.child._id)
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

