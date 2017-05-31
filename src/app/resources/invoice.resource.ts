import {HalProperty, IJSONSerializer} from "hal-rest-client";
import {Counterparty} from "./counterparty.resource";
import {Store} from "./store.resource";
import {Position} from "./position/position.resource";
import {Category} from "./category.resource";
import {HalSerializer} from "../services/hal-serializer.service";
import {HalResourceExt} from "./common/HalResourceExt";

export class Invoice extends HalResourceExt {
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

    @HalProperty(Position)
    public positions: Array<Position>;

    @HalProperty(Category)
    public categories: Array<Category>;
}
