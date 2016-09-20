import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

import {Position} from "./position";
import {Store} from "../store/store";
import {StoreService} from "../store/store.service";
import {ProductService} from "../product/product.service";
import {ProductRelationsComponent} from "../product/product-relations.component";
import {ProductDetailsComponent} from "../product/product-details.component";
import {PositionSell} from "../position-sell/position-sell";
import {Product} from "../product/product";
import {PositionSellComponent} from "../position-sell/position-sell.component";

import * as _ from 'lodash';

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

        if(this.position._sell_position) {
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
        this.actionChange(Action.Sell);
        this.refreshSubproducts();
    }

    createSellProduct() {
        if(this.isSellable()) {
            if (!this.position._sell_position) {
                this.position._sell_position = new PositionSell();
                this.position._sell_position._product = this.subProducts[0];
            }
        }
    }

    refreshSubproducts() {
        this._productService.show_children(this.position._product._id)
            .subscribe(
                c => {
                    this.subProducts = c._children;
                    this.createSellProduct();
                },
                err => console.log(err)
            );
    }

    isSellable():boolean {
        if(_.isEmpty(this.subProducts))
            return false;

        return true;
    }

    isActionSell():boolean {
        if(this.action == Action.Sell)
            return true;

        return false;
    }

    showPositionSell():boolean {
        if(this.isActionSell() || this.position._sell_position)
            return true;

        return false;
    }
}

