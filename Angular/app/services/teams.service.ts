import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { TEAMS } from '../models/mock-teams';


@Injectable()
export class TeamsService{
    getTeams(){
        return Promise.resolve(TEAMS);
    }
    getTeam(id: number){
        return Promise.resolve(TEAMS).then(teams => teams.filter(team => team.id === id)[0]);
    }

}
