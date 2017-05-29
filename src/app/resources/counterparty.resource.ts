import {HalResource, HalProperty} from "hal-rest-client";

export class Counterparty extends HalResource {
    @HalProperty()
    name: string;

    @HalProperty()
    fullName: string;
}
