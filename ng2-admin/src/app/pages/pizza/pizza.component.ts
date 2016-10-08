import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CompeteService } from '../../services/compete.service';

@Component({
  selector: 'pizza',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pizza.scss')],
  template: require('./pizza.html'),
})
export class PizzaComponent implements OnInit {

  pizza: any = {};
  ordered: boolean;

  constructor(private compete: CompeteService, private toast: ToastsManager) {

  }

  ngOnInit() {
    this.pizza.pepperoni = 0;
    this.pizza.cheese = 0;
    this.ordered = false;

    this.compete.getPizza()
      .subscribe(
      (data) => {
        console.log(data)
        if (data.success) {
          this.pizza = data.data;
          this.ordered = true;
        }
      });
  }

  onSubmit() {
    if (!this.ordered) {
      this.compete.postPizza(this.pizza.pepperoni, this.pizza.cheese)
        .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.ordered = true;
            this.toast.success(data.message, 'Success!');
          }
          else {

          }
        }
        );
    } else {
      this.compete.updatePizza(this.pizza.pepperoni, this.pizza.cheese)
        .subscribe(
        data => {
          if(data.success){
            this.toast.success(data.message, 'Success!');
          }
        });
    }
  }

  diagnose() {
    return JSON.stringify(this.pizza);
  }




}
