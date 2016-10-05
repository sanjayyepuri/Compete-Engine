import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {GlobalState} from '../../../global.state';

import { CompeteService } from '../../../services/compete.service';
import { AuthService } from '../../../services/auth.service';
import { Team } from '../../../models/team.model';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop implements OnInit{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  teamid: string = "JO";

  constructor(
    private _state:GlobalState,
    private compete: CompeteService,
    private auth: AuthService) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.compete.getTeam()
      .subscribe((team:Team) => {
        this.teamid = team.teamid;
      })
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logOut(){
    this.auth.logout();
  }

  ngOnInit(){

  }
}
