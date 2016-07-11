"use strict";
var router_1 = require('@angular/router');
var cpty_list_component_1 = require("./cpty/cpty-list.component");
exports.routes = [
    { path: '', component: cpty_list_component_1.CptyListComponent },
    { path: 'cpty', component: cpty_list_component_1.CptyListComponent },
    { path: '*', component: cpty_list_component_1.CptyListComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map