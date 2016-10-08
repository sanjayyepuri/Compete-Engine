import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form: FormGroup;
  public teamid: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, private auth: AuthService, private toast: ToastsManager) {
    this.form = fb.group({
      'teamid': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.teamid = this.form.controls['teamid'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values): void {
    this.submitted = true;
    if (this.form.valid) {
      this.auth.login(values.teamid, values.password).
        subscribe(
        success => {
          console.log(success);
          if (!success) {
            this.toast.error('Incorrect username or password');
          }
        }
        );
    }
  }
}
