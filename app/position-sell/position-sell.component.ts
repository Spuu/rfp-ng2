import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Product} from "../product/product";
import {PositionSell} from "./position-sell";
import * as _ from 'lodash'

@Component({
    selector: 'position-sell',
    templateUrl: 'app/position-sell/position-sell.component.html'
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
        if (!this.products || _.isEmpty(this.products)) {
            console.log('No products to choose...');
            return;
        }

        if (!this.positionSell) {
            console.log('No positionSell...');
            return;
        }

        if(!this.positionSell._product) {
            this.change();
        }
    }

    setProduct(product:Product) {
        this.positionSell._product = product;
    }

    delete() {
        this.onDelete.emit(true);
    }

    change() {
        this.positionSellChange.emit(this.positionSell);
    }
}

