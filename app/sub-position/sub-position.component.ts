import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Product} from "../product/product";
import {SubPosition} from "./sub-position";
import * as _ from 'lodash'

@Component({
    selector: 'sub-position',
    templateUrl: 'app/sub-position/sub-position.component.html'
})
export class SubPositionComponent implements OnInit {
    @Input()
    products:Product[] = [];

    @Input()
    subPosition:SubPosition;

    @Output()
    onDelete = new EventEmitter();

    @Output()
    subPositionChange = new EventEmitter();

    ngOnInit() {
        if (!this.products || _.isEmpty(this.products)) {
            console.log('No products to choose...');
            return;
        }

        if (!this.subPosition) {
            console.log('No subPosition...');
            return;
        }

        if(!this.subPosition._product) {
            this.change();
        }
    }

    setProduct(product:Product) {
        this.subPosition._product = product;
    }

    delete() {
        this.onDelete.emit(true);
    }

    change() {
        this.subPositionChange.emit(this.subPosition);
    }
}

