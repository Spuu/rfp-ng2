import {Component, Input, OnInit} from '@angular/core';

import {PositionService} from "../services/core/position.service";
import {StoreService} from "../services/core/store.service";
import {Store} from "../resources/store.resource";
import {Product} from "../resources/product/product.resource";
import {Position} from "../resources/position/position.resource";

@Component({
    selector: 'position-list',
    templateUrl: './position-list.component.html'
})
export class PositionListComponent implements OnInit {

    @Input()
    positions: Position[];

    stores: Promise<Store[]>|null = null;

    constructor(private positionService:PositionService,
                private storeService:StoreService) {
    }

    ngOnInit() {
        this.stores = this.storeService.getList();
    }

    addPosition(product:Product) {
        let newPosition:Position = this.positionService.getEmpty();
       // newPosition.setInputs(this.invoiceId, this.storeId);

        // search corresponding position
        // this._positionService.search(selectedProduct._id, this.storeId)
        //     .subscribe(
        //         p => {
        //             if (p) {
        //                 newPosition.copyValues(p);
        //
        //                 // if (!!p._sub_position) {
        //                 //     newPosition.prepareSubPosition(p._sub_position);
        //                 // }
        //             }
        //             this.positions.push(newPosition);
        //         },
        //         err => console.log('Corresponding position search: ' + err)
        //     );
    }

    savePosition(pos:Position) {
        // if (pos._id) {
        //     this._positionService.put(pos)
        //         .subscribe(
        //             p => {
        //                 pos = p;
        //                 console.log(`Position ${p._id} saved.`);
        //             },
        //             err => console.log("Unsuccessful save: " + err)
        //         )
        // } else {
        //     this._positionService.post(pos)
        //         .subscribe(
        //             p => {
        //                 pos = p;
        //                 console.log(`Position ${p._id} saved.`);
        //             },
        //             err => console.log("Unsuccessful save: " + err)
        //         )
        // }
    }

    save() {
        // filter out deleted position that were not save
        console.log(this.positions.length);
        //this.positions = this.positions.filter(p => !p.toDelete || !!p._id);
        console.log(this.positions.length);

        // for (let i in this.positions) {
        //     let pos = this.positions[i];
        //
        //     // delete saved positions
        //     if (pos.toDelete && pos._id) {
        //         this._positionService.del(pos._id)
        //             .subscribe(
        //                 p => {
        //                     console.log(`Position ${p._id} deleted.`);
        //                 },
        //                 err => console.log("Unsuccessful delete: " + err)
        //             )
        //     }
        // }

        // filter out deleted positions
        console.log(this.positions.length);
        //this.positions = this.positions.filter(p => !p.toDelete);
        console.log(this.positions.length);

        for (let i in this.positions) {
            let pos = this.positions[i];
            pos.index = +i;
        }

        for (let i in this.positions) {
            let pos = this.positions[i];

            // if (pos._sub_position)
            //     this.saveSubPosition(pos);
            // else
            //     this.savePosition(pos);
        }
    }

    delete(pos:Position) {
        //pos.toDelete = true;
    }

    clone(pos:Position) {
        // console.log('pos:');
        // console.log(pos);
        // var index = this.positions.indexOf(pos);
        // var new_pos = new Position();
        // new_pos.set(pos.clone());
        // new_pos.index = -1;
        // //delete new_pos._id;
        //
        // this.positions.splice(index, 0, new_pos);
    }

    getStores() {
        return this.stores;
    }
}

