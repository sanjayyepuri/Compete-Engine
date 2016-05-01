import { Component, OnInit } from 'angular2/core';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';

@Component({
    selector: 'compete-standings',
    templateUrl: 'app/components/html/compete-standings.component.html'
})
export class CompeteStandingsComponent implements OnInit {
    teams: Team[];
    constructor(private _teamsService: TeamsService) { }
    getTeams() {
        this._teamsService.getTeams().then(teams => this.teams = teams);
    }
    ngOnInit() {
        this.getTeams();
    }
}