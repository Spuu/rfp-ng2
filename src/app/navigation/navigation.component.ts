import {Component, Input} from '@angular/core';
import {AuthService} from "../services/common/auth.service";

@Component({
    selector: 'navigation-bar',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent {

    constructor(private auth: AuthService) {}

    @Input() private brandLogo: string;
}
