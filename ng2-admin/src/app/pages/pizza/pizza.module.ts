import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { PizzaComponent } from './pizza.component';
import { routing } from './pizza.routing';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

let options = <ToastOptions> {
  animate: 'flyRight',
  positionClass: 'toast-bottom-right',
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    ToastModule.forRoot(options),
    routing
  ],
  declarations: [
    PizzaComponent
  ]
})
export default class PizzaModule { }
