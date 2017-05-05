import {Component}  from '@angular/core';
import {AuthService} from "./services/common/auth.service";
import {HalResourceService} from "./services/core/hal-resource.service";
import {HashService} from "./services/common/hash.service";

@Component({
    templateUrl: './dummy.component.html'
})
export class DummyComponent {
    constructor(private auth: AuthService, private nav: HalResourceService, private hash: HashService) {}

    gimmetest() {
        console.log(this.auth.authenticated());
        const msg = this.hash.hash("dupa");

        console.log(msg);

        const dmsg = this.hash.unhash(msg);
        console.log(dmsg);
    }
}
