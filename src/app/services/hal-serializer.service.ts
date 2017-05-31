import {IJSONSerializer} from "hal-rest-client";

export class HalSerializer implements IJSONSerializer {

    /**
     * parse a prop value to server comprehensible value
     */
    public parseProp(value: any) {
        return value === null ? undefined : value;
    }

    /**
     * parse a hal-resource to server comprehensible value
     */
    public parseResource(value) {
        return value ? { "href" : value.uri } : undefined;
    }
}
