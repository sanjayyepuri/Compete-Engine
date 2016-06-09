import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import { HTTP_PROVIDERS }    from '@angular/http';
import { JwtHelper, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';


import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { CompeteStandingsComponent } from './compete-standings.component';
import { ClarificationComponent } from './clarification.component';


import { TeamsService } from '../services/teams.service';
import { AuthenticationService } from '../services/authentication.service';
import { CompeteService } from '../services/compete.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/html/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:
    [
      ROUTER_PROVIDERS,
      HTTP_PROVIDERS,
      AUTH_PROVIDERS,
      TeamsService,
      AuthenticationService,
      CompeteService
    ]
})
@RouteConfig([
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
        useAsDefault: true
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
    },
    {
        path: '/standings',
        name: 'Standings',
        component: CompeteStandingsComponent
    },
    {
        path: '/clarifications',
        name: 'Clarifications',
        component: ClarificationComponent
    }
])
export class AppComponent {
    title = 'Compete Engine';
    isAuth: boolean;
    team: any;
    constructor(private _teamService: TeamsService, private _router: Router, private _auth: AuthenticationService){
      _router.subscribe((val) => {
        console.log(val);
        this.team = _auth.getThisTeam()
        this.isAuth = _auth.isLoggedin();
      })

    }
    logout(){
      this._auth.logout();
      this._router.navigate(['Login']);
    }

}
