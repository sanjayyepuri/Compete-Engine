import { Component } from 'angular2/core';

import { CompeteStandingsComponent } from './compete-standings.component';
import { ClockComponent } from './clock.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/html/dashboard.component.html',
    directives: [CompeteStandingsComponent, ClockComponent]
})
export class DashboardComponent {

}