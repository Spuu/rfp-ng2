import {HalResource, IJSONSerializer} from "hal-rest-client";
import {HalSerializer} from "../../services/hal-serializer.service";

//const origUriKey = 'origURI';

export class HalResourceExt extends HalResource {

    private _origUri: string;

    get origUri(): string {
        return this._origUri;
    }

    update(serializer: IJSONSerializer = new HalSerializer()): Promise<any> {
        return super.update(serializer);
    }


    fetch(force?: boolean): Promise<this> {
        if (!this._origUri)
            this._origUri = this.uri;

        return super.fetch(force);
    }
}
