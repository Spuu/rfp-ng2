import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {PositionService} from "./position.service";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import forEach = require("core-js/fn/array/for-each");
import {SearchProductComponent} from "../product/search-product.component";
import {Product} from "../product/product";
import {PositionComponent} from "./position.component";
import {Position} from "./position";

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
    positions:Position[];
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
        let newPosition:Position = new Position(product);
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
        // filter out deleted position that were not save
        console.log(this.positions.length);
        this.positions = this.positions.filter(p => !p.toDelete || !!p._id);
        console.log(this.positions.length);

        for (let i in this.positions) {
            let pos = this.positions[i];

            // delete saved positions
            if(pos.toDelete && pos._id) {
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

        // filter out deleted positions
        console.log(this.positions.length);
        this.positions = this.positions.filter(p => !p.toDelete);
        console.log(this.positions.length);

        for (let i in this.positions) {
            let pos = this.positions[i];
            pos.index = +i;
        }
    }
    
    delete(pos:Position) {
        pos.toDelete = true;
    }

    clone(pos:Position) {
        console.log('pos:');
        console.log(pos);
        var index = this.positions.indexOf(pos);
        var new_pos = new Position();
        new_pos.set(pos.clone());
        delete new_pos._id;

        this.positions.splice(index, 0, new_pos);
    }

    getStores() {
        return this.stores;
    }
}

