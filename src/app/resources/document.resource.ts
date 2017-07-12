import {HalProperty, HalResource} from "hal-rest-client";
import {Category} from "./category.resource";

export class Document extends HalResource {
    @HalProperty()
    name: string;

    @HalProperty()
    documentDate: Date;

    @HalProperty()
    creationDate: Date;

    @HalProperty()
    lastModificationDate: Date;

    @HalProperty(Category)
    categories: Array<Category>;
}
