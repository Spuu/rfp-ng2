import { provideRouter, RouterConfig } from '@angular/router';
import {CptyListComponent} from "./cpty/cpty-list.component";

export const routes: RouterConfig = [
    { path: '', component: CptyListComponent },
    { path: 'cpty', component: CptyListComponent },
    { path: '*', component: CptyListComponent }
    //{ path: '/product/:id', name: 'ProductDetail', component: ProductDetailComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];