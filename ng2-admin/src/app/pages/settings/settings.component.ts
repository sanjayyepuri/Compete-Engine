import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


import { CompeteService } from '../../services/compete.service';
import { StateService } from '../../services/state.service';
import { Team } from '../../models/team.model.ts';
import { Competitor } from '../../models/competitor.model.ts';



@Component({
    selector: 'settings',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./settings.scss')],
    template: require('./settings.html')
})
export class SettingsComponent implements OnInit {

    team: Team;
    removed: string[] = [];

    constructor(private compete: CompeteService, private toast: ToastsManager) {

    }

    ngOnInit() {
        this.compete.getTeam()
            .subscribe(
            (team) => {
                this.team = team
            }
            );
    }

    addCompetitor() {
        if (this.team.members.length < 3) {
            this.team.members.push(new Competitor("", ""));
        }

    }
    removeCompetitor(i) {

        if (this.team.members[i]._id) {
            this.compete.deleteMember(this.team.members[i]._id)
                .subscribe(data => {
                    if(data.success){
                        this.toast.success(data.message, 'Success!');
                    }else {
                        this.toast.error('Unable to update Team.', 'Failure!');
                    }
                });

        }
        this.team.members.splice(i, 1);
    }

    onClick() {

    }

    onSubmit() {

        this.compete.updateTeam(this.team, this.removed)
            .subscribe((data) => {
                console.log(data);
                if(data.success){
                    this.toast.success(data.message, 'Success!');
                } else {
                    this.toast.error('Unable to update Team.', 'Failure!');
                }
            });
    }

    diagnose() {
        return JSON.stringify(this.team);
    }

    trackByIndex(index: number, obj: any) {
        return obj;
    }
}