import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { CompeteService } from '../../services/compete.service';
import { Competitor } from '../../models/competitor.model.ts';


@Component({
  selector: 'scores',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./scores.scss')],
  template: require('./scores.html'),
})
export class ScoresComponent {
  competitors: Competitor[];

  constructor(fb:FormBuilder, private compete: CompeteService) {

  }

  ngOnInit(){
    this.compete.getMembers()
      .subscribe( data => this.competitors = data);
  }

}
