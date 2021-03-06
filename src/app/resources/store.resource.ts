import {HalProperty, HalResource} from "hal-rest-client";

export class Store extends HalResource {
    @HalProperty()
    name: string;

    @HalProperty()
    fullName: string;
}
