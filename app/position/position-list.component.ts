import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {PositionService} from "./position.service";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import forEach = require("core-js/fn/array/for-each");
import {SearchProductComponent} from "../product/search-product.component";
import {Product} from "../product/product";
import {PositionComponent} from "./position.component";
import {PositionGui} from "./position-gui";

@Component({
    selector: 'position-list',
    templateUrl: 'app/position/position-list.component.html',
    directives: [SearchProductComponent, PositionComponent]
})
export class PositionListComponent implements OnInit {
    @Input()
    invoiceId:string;
    @Input()
    storeId:string;
    @Input()
    positions:PositionGui[];
    stores:Store[];

    constructor(private _positionService:PositionService,
                private _storeService:StoreService) {
    }

    ngOnInit() {
        if (!this.invoiceId || !this.storeId) {
            console.log('Insufficient data provided...');
            return;
        }

        if (!this.positions)
            this.positions = [];

        // load stores
        this._storeService.getList()
            .subscribe(
                s => this.stores = s,
                err => console.log(err)
            );
    }

    addPosition(product:Product) {
        console.log(product);
        let productId:string = product._id;
        let newPosition:PositionGui = new PositionGui(product);
        newPosition.setInputs(productId, this.invoiceId, this.storeId);

        // search corresponding position
        this._positionService.search(productId, this.storeId)
            .subscribe(
                p => {
                    if (p) {
                        newPosition.buy_netto_price = p.buy_netto_price;
                        newPosition.sell_brutto_price = p.sell_brutto_price;
                        newPosition.discount = p.discount;
                        newPosition.retail_rate = p.retail_rate;
                    }
                    this.positions.push(newPosition);
                },
                err => console.log('Correstponding position search: ' + err)
            );
    }

    save() {
        for (let i in this.positions) {
            let pos = this.positions[i];

            if(pos.toDelete) {
                this._positionService.del(pos._id)
                    .subscribe(
                        p => {
                            console.log(`Position ${p._id} deleted.`);
                        },
                        err => console.log("Unsuccessful delete: " + err)
                    )
            } else if (pos._id) {
                this._positionService.put(pos)
                    .subscribe(
                        p => {
                            console.log(`Position ${p._id} saved.`);
                        },
                        err => console.log("Unsuccessful save: " + err)
                    )
            } else {
                this._positionService.post(pos)
                    .subscribe(
                        p => {
                            pos._id = p._id;
                            console.log(`Position ${p._id} saved.`);
                        },
                        err => console.log("Unsuccessful save: " + err)
                    )
            }
        }
    }
    
    delete(pos:PositionGui) {
        pos.toDelete = true;
    }

    clone(pos:PositionGui) {
        var index = this.positions.indexOf(pos);
        var new_pos:PositionGui = JSON.parse(JSON.stringify(pos)); // clone position
        delete new_pos._id;

        this.positions.splice(index, 0, new_pos);
    }

    getStores() {
        return this.stores;
    }
}

