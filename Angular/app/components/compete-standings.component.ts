import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';
import { CompeteService } from '../services/compete.service';

@Component({
    selector: 'compete-standings',
    templateUrl: 'app/components/html/compete-standings.component.html'
})
export class CompeteStandingsComponent implements OnInit {
    teams: any;
    tmpvar: any;
    constructor(private _teamsService: TeamsService, private _compete: CompeteService) { }
    getTeams() {
        this._teamsService.getTeams().then(teams => this.teams = teams);
        this._compete.getTeams()
        .subscribe(
          data => console.log(data),
          err => console.log(err),
          () => console.log('wtf')
        );
    }
    ngOnInit() {
        this.getTeams();
    }
}
