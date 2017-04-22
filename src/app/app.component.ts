import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import info from '../../package.json';
const appVersion = info.version;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ReksFaktPro';
    version = appVersion;

    private brandLogo: string;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.brandLogo = `${this.title} v${this.version}`;
    }
}
