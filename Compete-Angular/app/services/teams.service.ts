import { Injectable } from 'angular2/core';
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
