import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import {Product} from './product';
import {ProductService} from './product.service';
import {ModalConfirmationButton} from "../generic/modal-confirmation-button.component";

@Component({
    selector: 'product-details',
    templateUrl: 'app/product/product-details.component.html',
    directives: [ModalConfirmationButton]
})
export class ProductDetailsComponent implements OnInit {
    @Input()
    product:Product;

    @Output()
    onSave = new EventEmitter();

    @Output()
    onDelete = new EventEmitter();

    @Output()
    onCancel = new EventEmitter();

    @Output()
    productChange = new EventEmitter();

    originalProduct:Product;

    constructor(private _productService:ProductService) {
    }

    static clone(obj:any):any {
        return JSON.parse(JSON.stringify(obj));
    }

    ngOnInit() {
        this.originalProduct = ProductDetailsComponent.clone(this.product);
    }

    save() {
        if(!!this.product._id) {
            this._productService.put(this.product)
                .subscribe(
                    product => {
                        this.product = product;
                        this.productChange.emit(this.product);
                        this.onSave.emit(true);
                    },
                    error => console.log('ProductDetailsComp err: ' + error)
                );
        } else {
            this._productService.post(this.product)
                .subscribe(
                    product => {
                        this.product = product;
                        this.productChange.emit(this.product);
                        this.onSave.emit(true);
                    },
                    error => console.log('ProductDetailsComp err: ' + error)
                );
        }
    }

    modalConfirmation() {
        this._productService.del(this.product._id)
            .subscribe(
                data => {
                    this.onDelete.emit(true);
                },
                error => console.log('ProductDetailsComp err: ' + error)
            );
    }

    cancel() {
        this.product = ProductDetailsComponent.clone(this.originalProduct);
        this.onCancel.emit(true);
        this.productChange.emit(this.product);
    }
}