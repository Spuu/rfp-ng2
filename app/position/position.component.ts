import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

import {Position} from "./position";
import {PositionService} from "./position.service";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import {ProductService} from "../product/product.service";
import {ProductRelationsComponent} from "../product/product-relations.component";
import {ProductDetailsComponent} from "../product/product-details.component";
import {PositionSell} from "../position-sell/position-sell";
import {Product} from "../product/product";
import {PositionSellComponent} from "../position-sell/position-sell.component";

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
    directives: [NgSwitch, NgSwitchCase, NgSwitchDefault,
        ProductRelationsComponent, ProductDetailsComponent,
        PositionSellComponent]
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

    possibleChildren:Product[] = [];

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

        if(this.position._sell_position && this.possibleChildren.length === 0) {
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

    addSellPosition() {
        if (!this.position._sell_position) {
            this.position._sell_position = new PositionSell();
        }

        this.refreshSubproducts();
    }

    refreshSubproducts() {
        this._productService.show_children(this.position._product)
            .subscribe(
                c => {
                    this.possibleChildren = c._children;
                },
                err => console.log(err)
            );
    }
}

