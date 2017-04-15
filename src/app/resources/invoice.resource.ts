import {HalProperty, HalResource} from "hal-rest-client";
import {StoreResource} from "./store.resource";
import {CounterpartyResource} from "./counterparty.resource";

export class InvoiceResource extends HalResource {
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
    public store: StoreResource;

    @HalProperty()
    public counterparty: CounterpartyResource;
}
