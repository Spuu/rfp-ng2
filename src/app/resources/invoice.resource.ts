import {HalProperty} from "hal-rest-client";
import {Counterparty} from "./counterparty.resource";
import {Store} from "./store.resource";
import {Position} from "./position/position.resource";
import {Document} from "./document.resource";

export enum InvoiceType {
    BUY,
    SELL
}

export class Invoice extends Document {
    @HalProperty()
    public type: InvoiceType;

    @HalProperty()
    public store: Store;

    @HalProperty()
    public counterparty: Counterparty;

    @HalProperty(Position)
    public positions: Array<Position>;
}
