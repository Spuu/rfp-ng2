import {HalResource, HalProperty} from "hal-rest-client";

export class StoreResource extends HalResource {
    @HalProperty()
    public name: string;

    @HalProperty()
    public fullName: string;
}
