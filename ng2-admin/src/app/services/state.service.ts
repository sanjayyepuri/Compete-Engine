import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CompeteService } from './compete.service';
import '../rxjs-operators'

import { Team } from '../models/team.model';


@Injectable()
export class StateService{

    team: Team;

    constructor(private compete: CompeteService){

    }

    update(){
        this.compete.getTeam()
            .subscribe(
                (team: Team) => this.team = team
            );
    }

    getTeam(): Team{
        return this.team;
    }

    setTeam(team: Team): void {
        this.team = team;

    }



}
