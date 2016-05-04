import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';

import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { CompeteStandingsComponent } from './compete-standings.component';
import { ClarificationComponent } from './clarification.component';


import { TeamsService } from '../services/teams.service'

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/html/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, TeamsService]
})
@RouteConfig([
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
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
}