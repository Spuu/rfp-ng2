import {Injectable} from "@angular/core";
import {createClient, HalRestClient} from "hal-rest-client";
import {environment} from "../../../environments/environment";

@Injectable()
export class HalResourceService {

    private client: HalRestClient;

    constructor() {
        this.client = createClient(environment.apiUrl);
    }

    getClient() {
        let token = `Bearer ${localStorage.getItem('id_token')}`;
        return this.client.addHeader('authorization', token);
    }
}
