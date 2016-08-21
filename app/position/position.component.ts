import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

import {Position} from "./position";
import {PositionService} from "./position.service";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import {ProductService} from "../product/product.service";
import {PositionGui} from "./position-gui";
import {ProductRelationsComponent} from "../product/product-relations.component";
import {ProductDetailsComponent} from "../product/product-details.component";

enum Action {
    None = 0,
    Clone,
    Sell,
    Edit,
    Set_Father,
    Set_Child
}

@Component({
    selector: 'position-component',
    templateUrl: 'app/position/position.component.html',
    directives: [NgSwitch, NgSwitchCase, NgSwitchDefault, ProductRelationsComponent, ProductDetailsComponent]
})
export class PositionComponent implements OnInit {
    @Input()
    position:PositionGui;
    @Input()
    stores:Store[];

    @Output()
    onDelete = new EventEmitter();

    @Output()
    onClone = new EventEmitter();

    action:Action = Action.None;

    constructor(private _storeService:StoreService) {
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
}

