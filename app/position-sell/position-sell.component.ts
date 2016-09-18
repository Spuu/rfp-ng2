import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Product} from "../product/product";
import {PositionSell} from "./position-sell";

@Component({
    selector: 'position-sell',
    templateUrl: 'app/position-sell/position-sell.component.html',
    directives: []
})
export class PositionSellComponent implements OnInit {
    @Input()
    products:Product[] = [];

    @Input()
    positionSell:PositionSell;

    @Output()
    onDelete = new EventEmitter();

    @Output()
    positionSellChange = new EventEmitter();

    ngOnInit() {
        if (this.products.length === 0) {
            console.log('No products to choose...');
            return;
        }

        if (!this.positionSell) {
            console.log('No positionSell...');
            return;
        }

        if(!this.positionSell._product) {
            this.setProduct(this.products[0]);
            this.change();
        }
    }

    setProduct(product:Product) {
        console.log(this.positionSell);
        this.positionSell._product = product;
        console.log(this.positionSell);
    }

    delete() {
        this.onDelete.emit(true);
    }

    change() {
        this.positionSellChange.emit(this.positionSell);
        console.log(this.positionSell)
    }
}

