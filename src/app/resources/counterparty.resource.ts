import {HalProperty} from "hal-rest-client";
import {HalResourceExt} from "./common/HalResourceExt";

export class Counterparty extends HalResourceExt {
    @HalProperty()
    name: string;

    @HalProperty()
    fullName: string;
}
