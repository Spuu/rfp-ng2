import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {PositionService} from "./position.service";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import forEach = require("core-js/fn/array/for-each");
import {Product} from "../product/product";
import {Position} from "./position";
import {SubPositionService} from "../sub-position/sub-position.service";

@Component({
    selector: 'position-list',
    templateUrl: 'app/position/position-list.component.html'
})
export class PositionListComponent implements OnInit {
    @Input()
    invoiceId:string;
    @Input()
    storeId:string;

    positions:Position[];
    stores:Store[];

    constructor(private _positionService:PositionService,
                private _subPositionService:SubPositionService,
                private _storeService:StoreService) {
    }

    ngOnInit() {
        if (!this.invoiceId || !this.storeId) {
            console.log('Insufficient data provided...');
            return;
        }

        if (!this.positions) {
            this.positions = [];
            this._positionService.getInvoice(this.invoiceId)
                .subscribe(
                    p => this.positions = p,
                    err => console.log(err)
                );
        }

        // load stores
        this._storeService.getList()
            .subscribe(
                s => this.stores = s,
                err => console.log(err)
            );
    }

    addPosition(product:Product) {
        let newPosition:Position = new Position(product);
        newPosition.setInputs(this.invoiceId, this.storeId);

        // search corresponding position
        this._positionService.search(product._id, this.storeId)
            .subscribe(
                p => {
                    if (p) {
                        newPosition.copyValues(p);

                        if (!!p._sub_position) {
                            newPosition.prepareSubPosition(p._sub_position);
                        }
                    }
                    this.positions.push(newPosition);
                },
                err => console.log('Corresponding position search: ' + err)
            );
    }

    savePosition(pos:Position) {
        if (pos._id) {
            this._positionService.put(pos)
                .subscribe(
                    p => {
                        pos = p;
                        console.log(`Position ${p._id} saved.`);
                    },
                    err => console.log("Unsuccessful save: " + err)
                )
        } else {
            this._positionService.post(pos)
                .subscribe(
                    p => {
                        pos = p;
                        console.log(`Position ${p._id} saved.`);
                    },
                    err => console.log("Unsuccessful save: " + err)
                )
        }
    }

    saveSubPosition(pos:Position) {
        if (pos._sub_position._id) {
            this._subPositionService.put(pos._sub_position)
                .subscribe(
                    p => {
                        pos._sub_position._id = p._id;
                        this.savePosition(pos);
                    },
                    err => console.log("Unsuccessful save: " + err)
                )
        } else {
            this._subPositionService.post(pos._sub_position)
                .subscribe(
                    p => {
                        pos._sub_position._id = p._id;
                        this.savePosition(pos);
                    },
                    err => console.log("Unsuccessful save: " + err)
                )
        }
    }

    save() {
        // filter out deleted position that were not save
        console.log(this.positions.length);
        this.positions = this.positions.filter(p => !p.toDelete || !!p._id);
        console.log(this.positions.length);

        for (let i in this.positions) {
            let pos = this.positions[i];

            // delete saved positions
            if (pos.toDelete && pos._id) {
                this._positionService.del(pos._id)
                    .subscribe(
                        p => {
                            console.log(`Position ${p._id} deleted.`);
                        },
                        err => console.log("Unsuccessful delete: " + err)
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

        for (let i in this.positions) {
            let pos = this.positions[i];

            if (pos._sub_position)
                this.saveSubPosition(pos);
            else
                this.savePosition(pos);
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
        new_pos.index = -1;
        //delete new_pos._id;

        this.positions.splice(index, 0, new_pos);
    }

    getStores() {
        return this.stores;
    }
}

