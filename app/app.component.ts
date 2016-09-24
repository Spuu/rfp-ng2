import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a routerLink="/" class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a routerLink="/cpty">Kontrahenci</a></li>
                    <li><a routerLink="/store">Sklepy</a></li>
                    <li><a routerLink="/product">Produkty</a></li>
                    <li><a routerLink="/invoice">Faktury</a></li>
                </ul>
            </div>
        </nav>
        <div class='container-fluid'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `
})
export class AppComponent {
    pageTitle: string = "ReksFaktPro v2.0.0"
}
