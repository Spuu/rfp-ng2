import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Position} from "./position";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import {ProductService} from "../product/product.service";

import {SubPosition} from "../sub-position/sub-position";
import {Product} from "../product/product";

import * as _ from "lodash";

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
    templateUrl: 'app/position/position.component.html'
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

    subProducts:Product[] = [];

    constructor(private _storeService:StoreService, private _productService:ProductService) {
    }

    ngOnInit() {
        if (!this.position) {
            console.log('No position provided...');
            return;
        }

        if (!this.stores) {
            this._storeService.getList()
                .subscribe(
                    s => this.stores = s,
                    err => console.log(err)
                );
        }

        if(this.position._sub_position) {
            this.refreshSubproducts();
        }
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

    createSubProduct() {
        if(this.isSubbed()) {
            if (!this.position._sub_position) {
                this.position._sub_position = new SubPosition();
                this.position._sub_position._product = this.subProducts[0];
            }
        }
    }

    refreshSubproducts() {
        this._productService.show_children(this.position._product._id)
            .subscribe(
                c => {
                    this.subProducts = c._children;
                    this.createSubProduct();
                },
                err => console.log(err)
            );
    }

    isSubbed():boolean {
        if(_.isEmpty(this.subProducts))
            return false;

        return true;
    }

    isActionSub():boolean {
        if(this.action == Action.Sub)
            return true;

        return false;
    }

    showSubPosition():boolean {
        if(this.isActionSub() || this.position._sub_position)
            return true;

        return false;
    }
}

