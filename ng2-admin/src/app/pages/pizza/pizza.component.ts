import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { CompeteService } from '../../services/compete.service';

@Component({
  selector: 'pizza',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pizza.scss')],
  template: require('./pizza.html'),
})
export class PizzaComponent {

  pizza: any = {};

  constructor(private compete: CompeteService) {
    this.pizza.pepperoni = 0;
    this.pizza.cheese = 0;
  }

}
