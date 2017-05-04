import {HalProperty, HalResource} from "hal-rest-client";
import {Counterparty} from "./counterparty.resource";
import {Store} from "./store.resource";

export class Invoice extends HalResource {
    @HalProperty()
    public name: string;

    @HalProperty()
    public type: string;

    @HalProperty()
    public creationDate: Date;

    @HalProperty()
    public documentDate: Date;

    @HalProperty()
    public lastModificationDate: Date;

    @HalProperty()
    public store: Store;

    @HalProperty()
    public counterparty: Counterparty;
}
