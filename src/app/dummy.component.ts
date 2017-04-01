import {Component}  from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
    templateUrl: './dummy.component.html'
})
export class DummyComponent {
    constructor(private auth: AuthService) {}
}
