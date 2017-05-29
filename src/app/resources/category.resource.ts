import {HalResource, HalProperty} from "hal-rest-client";

export class Category extends HalResource {
    @HalProperty()
    name: string;

    @HalProperty()
    type: string;
}
