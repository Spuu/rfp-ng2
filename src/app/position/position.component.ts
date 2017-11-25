import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {StoreService} from "../services/core/store.service";
import {ProductService} from "../services/core/product.service";

import * as _ from "lodash";
import {Store} from "../resources/store.resource";
import {Position} from "../resources/position/position.resource";
import {Product} from "../resources/product/product.resource";

@Component({
    selector: 'position-component',
    templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit {
    @Input()
    position: Position;
    @Input()
    stores: Store[];

    @Output()
    onDelete = new EventEmitter<void>();

    @Output()
    onClone = new EventEmitter<void>();

    showSubPosition: boolean = false;
    showEdit: boolean = false;

    async ngOnInit() {
        if (!this.position) {
            console.log('No position provided...');
            return;
        }

        if (_.isEmpty(this.stores)) {
            console.log('No stores provided...');
            return;
        }

        await this.position.product.fetch();
    }

    delete() {
        this.onDelete.emit();
    }

    clone() {
        this.onClone.emit();
    }

    addSubPosition() {
        this.showSubPosition = true;
        this.refreshSubproducts();
    }

    async refreshSubproducts() {
        this.position.product.children.map((child) => child.fetch());

        //
        // this.productService.show_children(this.position._product._id)
        //     .subscribe(
        //         c => {
        //             this.subProducts = c._children;
        //             this.createSubProduct();
        //         },
        //         err => console.log(err)
        //     );
    }
}

