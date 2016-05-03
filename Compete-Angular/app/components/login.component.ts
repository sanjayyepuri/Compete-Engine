import {Component} from 'angular2/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
import { Router } from 'angular2/router';
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
            (token: any) => this._router.navigate(['Dashboard']),
            () => {this.error = true; }
        );
    }
}