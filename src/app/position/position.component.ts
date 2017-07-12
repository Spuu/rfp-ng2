import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {StoreService} from "../services/core/store.service";
import {ProductService} from "../services/core/product.service";

import * as _ from "lodash";
import {Store} from "../resources/store.resource";
import {Position} from "../resources/position/position.resource";

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
    onDelete = new EventEmitter<void>();

    @Output()
    onClone = new EventEmitter<void>();

    action:Action = Action.None;

    constructor(private storeService:StoreService, private productService:ProductService) {
    }

    ngOnInit() {
        if (!this.position) {
            console.log('No position provided...');
            return;
        }

        if (_.isEmpty(this.stores)) {
            console.log('No stores provided...');
            return;
        }
    }

    actionChange(type:number) {
        this.action = type;
    }

    delete() {
        this.onDelete.emit();
    }

    clone() {
        this.onClone.emit();
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

