import {Component}  from '@angular/core';
import {PositionListComponent} from "./position/position-list.component";

@Component({
    templateUrl: 'app/dummy.component.html',
    directives: [PositionListComponent]
})
export class DummyComponent {

}
