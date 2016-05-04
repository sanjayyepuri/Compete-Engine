import { Component } from 'angular2/core';

import { CompeteStandingsComponent } from './compete-standings.component';
import { ClockComponent } from './clock.component';
import { AuthenticationService } from '../services/authentication.service';
import { tokenNotExpired  } from 'angular2-jwt';
import { CanActivate } from 'angular2/router';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/html/dashboard.component.html',
    directives: [CompeteStandingsComponent, ClockComponent]
})

@CanActivate(() => tokenNotExpired())
export class DashboardComponent {

}
