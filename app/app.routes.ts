import { provideRouter, RouterConfig } from '@angular/router';
import {CptyListComponent} from "./cpty/cpty-list.component";
import {CptyDetailFormComponent} from "./cpty/cpty-detail-form.component";

export const routes: RouterConfig = [
    { path: '', component: CptyListComponent },
    { path: 'cpty', component: CptyListComponent },
    { path: 'cpty/:id', component: CptyDetailFormComponent },
    { path: '*', component: CptyListComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];