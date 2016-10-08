import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Register } from './register.component';
import { routing }       from './register.routing';
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
    Register
  ]
})
export default class RegisterModule {}
