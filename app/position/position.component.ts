import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Position} from "./position";
import {PositionService} from "./position.service";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import {ProductService} from "../product/product.service";
import {PositionGui} from "./position-gui";

@Component({
    selector: 'position-component',
    templateUrl: 'app/position/position.component.html'
})
export class PositionComponent implements OnInit {
    @Input() position:PositionGui;
    @Input() stores:Store[];

    // productName:string;

    constructor(private _storeService:StoreService,
                private _productService:ProductService) {
    }

    ngOnInit() {
        if (!this.position) {
            console.log('No position provided...');
            return;
        }

        // this._productService.get(this.position._product)
        //     .subscribe(
        //         p => this.productName = p.name,
        //         err => console.log('Product corr name get: ' + err)
        //     );

        if(!this.stores) {
            this._storeService.getList()
                .subscribe(
                    s => this.stores = s,
                    err => console.log(err)
                );
        }
    }
}

