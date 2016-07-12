import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { LOG_LOGGER_PROVIDERS } from "angular2-logger/core";
import { disableDeprecatedForms, provideForms } from '@angular/forms';

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    LOG_LOGGER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]);
