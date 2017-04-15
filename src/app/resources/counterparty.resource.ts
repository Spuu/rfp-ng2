import {HalResource, HalProperty} from "hal-rest-client";

export class CounterpartyResource extends HalResource {
    @HalProperty()
    public name: string;

    @HalProperty()
    public fullName: string;
}
