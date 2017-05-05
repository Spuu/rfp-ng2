import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Position} from "./position";
import {StoreService} from "../services/core/store.service";
import {ProductService} from "../services/core/product.service";

import * as _ from "lodash";
import {Store} from "../resources/store.resource";

enum Action {
    None = 0,
    Clone,
    Sub,
    Edit,
    Set_Father,
    Set_Child
}

@Component({
    selector: 'position-component',
    templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit {
    @Input()
    position:Position;
    @Input()
    stores:Store[];

    @Output()
    onDelete = new EventEmitter();

    @Output()
    onClone = new EventEmitter();

    action:Action = Action.None;

    constructor(private _storeService:StoreService, private _productService:ProductService) {
    }

    ngOnInit() {
        if (!this.position) {
            console.log('No position provided...');
            return;
        }

        // if (!this.stores) {
        //     this._storeService.getList()
        //         .subscribe(
        //             s => this.stores = s.docs,
        //             err => console.log(err)
        //         );
        // }

        // if(this.position._sub_position) {
        //     this.refreshSubproducts();
        // }
    }

    actionChange(type:number) {
        this.action = type;
    }

    delete() {
        this.onDelete.emit(true);
    }

    clone() {
        this.onClone.emit(true);
    }

    addSubPosition() {
        this.actionChange(Action.Sub);
        this.refreshSubproducts();
    }

    refreshSubproducts() {
        // this._productService.show_children(this.position._product._id)
        //     .subscribe(
        //         c => {
        //             this.subProducts = c._children;
        //             this.createSubProduct();
        //         },
        //         err => console.log(err)
        //     );
    }

    isSubbed():boolean {
        // if(_.isEmpty(this.subProducts))
        //     return false;
        //
        return true;
    }

    isActionSub():boolean {
        if(this.action == Action.Sub)
            return true;

        return false;
    }

    showSubPosition():boolean {
        // if(this.isActionSub() || this.position._sub_position)
        //     return true;

        return false;
    }
}

