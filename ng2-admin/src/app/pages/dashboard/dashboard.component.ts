import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { CompeteService } from '../../services/compete.service';
import { StateService } from '../../services/state.service';
import { Team } from '../../models/team.model.ts';
import { Competitor } from '../../models/competitor.model.ts';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard implements OnInit {
  team: Team;
  constructor(private compete: CompeteService) {
  }

  ngOnInit() {
    this.compete.getTeam()
      .subscribe(
        team => {
          this.team = team
        }
      );
  }





}
