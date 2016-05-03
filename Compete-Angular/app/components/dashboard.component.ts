import { Component } from 'angular2/core';

import { CompeteStandingsComponent } from './compete-standings.component';
import { ClockComponent } from './clock.component';
import { AuthenticationService } from '../services/authentication.service';
import { isLoggedin } from '../services/is-loggedin';
import { CanActivate } from 'angular2/router';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/html/dashboard.component.html',
    directives: [CompeteStandingsComponent, ClockComponent]
})

@CanActivate(() => isLoggedin())
export class DashboardComponent {
    
}