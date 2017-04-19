import { Injectable } from '@angular/core';

@Injectable()
export class Logger {

    constructor() {
    }

    debug(msg:String) {
        console.log("DEBUG: " + msg);
    }
}