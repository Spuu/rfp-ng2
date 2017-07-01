import {Injectable} from "@angular/core";
import {createClient, HalRestClient} from "hal-rest-client";
import {HalResourceService} from "./core/hal-resource.service";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import Axios from "axios";

@Injectable()
export class DbRefUpdaterService extends HalResourceService {
    prepareClient(): HalRestClient {
        return createClient().addHeader('Content-Type', 'text/uri-list');
    }

    async update(url: string, value: string) {
        let client = this.getClient();

        let token = `Bearer ${localStorage.getItem('id_token')}`;
        let axios: AxiosInstance;
        axios = Axios.create(
            {
                headers: {
                    'Content-Type': 'text/uri-list',
                    'authorization': token
                }
            }
        );

        let config: AxiosRequestConfig = {
            url: url,
            data: value,
            method: "put"
        };
        await axios.request(config);
    }
}
