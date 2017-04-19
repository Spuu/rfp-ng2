import {Injectable} from "@angular/core";
import * as crypto from "crypto-js";

@Injectable()
export class HashService {

    private MAGIC_KEY: string = 'secret-key-1-2-3';

    hash(message: string): string {
        return crypto.AES.encrypt(message, this.MAGIC_KEY).toString();
    }

    unhash(message: string): string {
        let bytes  = crypto.AES.decrypt(message, this.MAGIC_KEY);
        return bytes.toString(crypto.enc.Utf8);
    }

}
