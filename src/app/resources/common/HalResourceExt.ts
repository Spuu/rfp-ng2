import {HalProperty, HalResource, IJSONSerializer} from "hal-rest-client";
import {HalSerializer} from "../../services/hal-serializer.service";

export class HalResourceExt extends HalResource {
    update(serializer: IJSONSerializer = new HalSerializer()): Promise<any> {
        return super.update(serializer);
    }
}
