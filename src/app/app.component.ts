import {Component} from '@angular/core';
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
}
