import { Component, OnInit } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { CanActivate } from '@angular/router-deprecated';

import { CompeteStandingsComponent } from './compete-standings.component';
import { ClockComponent } from './clock.component';
import { AuthenticationService } from '../services/authentication.service';
import { isLoggedin } from '../services/is-loggedin';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/html/dashboard.component.html',
    directives: [CompeteStandingsComponent, ClockComponent]
})

@CanActivate(() => isLoggedin())
export class DashboardComponent implements OnInit{


  ngOnInit(){

  }


}
