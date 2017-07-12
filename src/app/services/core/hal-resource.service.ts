import {Injectable} from "@angular/core";
import {createClient, HalRestClient} from "hal-rest-client";
import {environment} from "../../../environments/environment";

@Injectable()
export class HalResourceService {

    private client: HalRestClient;

    constructor() {
        let token = `Bearer ${localStorage.getItem('id_token')}`;

        this.client = createClient(
            environment.apiUrl,
            {
                'headers': {
                    'authorization': token,
                    'Content-Type': 'application/hal+json'
                }
            }
        );
    }

    getClient(): HalRestClient {
        return this.client;
    }
}
