import {Component} from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import { Router } from '@angular/router-deprecated';
import { AuthenticationService } from '../services/authentication.service';


@Component({
    selector: 'login',
    templateUrl: 'app/components/html/login.component.html',
    directives: [FORM_DIRECTIVES, NgIf],
    providers: [AuthenticationService]

})
export class LoginComponent {
    form: ControlGroup;
    error: boolean = false;
    constructor(fb: FormBuilder, public auth: AuthenticationService, private _router: Router){
        this.form = fb.group({
            teamid: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(value: any){
        this.auth.login(value.teamid, value.password)
        .subscribe(
            (token: any) => {
              console.log(token);
              this._router.navigate(['Dashboard'])
            },
            () => {this.error = true; }
        );
    }
}
