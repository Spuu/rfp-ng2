import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

import {ProductService} from '../services/core/product.service';
import {Product} from "../resources/product/product.resource";
import * as _ from "lodash";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductStatus} from "../resources/product/product-status.enum";
import {CashRegisterInfo} from "../resources/product/cash-register-info";

@Component({
    selector: 'product-details',
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent {
    @Input()
    product: Product;

    @Output()
    save = new EventEmitter<void>();

    @Output()
    delete = new EventEmitter<void>();

    @Output()
    cancel = new EventEmitter<void>();

    productForm: FormGroup;

    constructor(private productService: ProductService,
                private fb: FormBuilder) {

        this.createForm();
    }

    createForm() {
        this.productForm = this.fb.group({
            enabled: '',
            barcode: '',
            ean: '',
            name: '',
            pihAmount: '',
            pihUnit: '',
            sellUnit: '',
            vat: '',
            status: '',
            cashRegisterInfo: this.fb.group(new CashRegisterInfo())
        });
    }

    ngOnChanges() {
        this.productForm.reset({
            enabled: this.product.enabled || true,
            barcode: this.product.barcode,
            ean: this.product.ean,
            name: this.product.name,
            pihAmount: this.product.pihAmount,
            pihUnit: this.product.pihUnit,
            sellUnit: this.product.sellUnit || 'szt',
            vat: this.product.vat,
            status: this.product.status
        });

        this.productForm.setControl('cashRegisterInfo', this.fb.group(this.product.cashRegisterInfo));
    }

    async onSubmit() {
        this.prepareSaveProduct();

        if (_.isEqual(this.product.isLoaded, true))
            await this.productService.put(this.product);
        else
            await this.productService.post(this.product);

        this.ngOnChanges();
        this.save.emit();
    }

    prepareSaveProduct() {
        const formModel = this.productForm.value;

        this.product.enabled = formModel.enabled as boolean;
        this.product.barcode = formModel.barcode as boolean;
        this.product.ean = formModel.ean as string;
        this.product.name = formModel.name as string;
        this.product.pihAmount = formModel.pihAmount as number;
        this.product.pihUnit = formModel.pihUnit as string;
        this.product.sellUnit = formModel.sellUnit as string;
        this.product.vat = formModel.vat as number;
        this.product.status = ProductStatus.UPDATED;

        const cashRegisterInfoDeepCopy = Object.assign({}, formModel.cashRegisterInfo);
        this.product.cashRegisterInfo = cashRegisterInfoDeepCopy;
    }

    revert() {
        this.ngOnChanges();
        this.cancel.emit();
    }

    modalConfirmation() {
        this.product.delete();
        this.delete.emit();
    }
}
