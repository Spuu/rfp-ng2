import {Component}  from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {HalResourceService} from "./resources/hal-resource.service";

@Component({
    templateUrl: './dummy.component.html'
})
export class DummyComponent {
    constructor(private auth: AuthService, private nav: HalResourceService) {}

    gimmetest() {
        console.log(this.nav.getInvoices());
    }
}
