import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CompeteService } from './compete.service';
import { StateService } from'./state.service';
import '../rxjs-operators'


@Injectable()
export class AuthService implements CanActivate{

    token: string;

    constructor(private compete: CompeteService, private router: Router, private state: StateService) {
        if(localStorage.getItem('token')){
            this.token = localStorage.getItem('token');
        }

    }

    login(teamid: string, password: string): boolean{
        this.compete.getAuthentication(teamid, password)
            .subscribe(res => {
                console.log(res);
                if(res.data.token){
                    this.token = res.data.token;
                    localStorage.setItem('token', this.token);
                    this.state.update();
                    this.router.navigate(['/competition']);
                    return true;
                } else {
                    return false;
                }
            },
            error => {
                console.log(error);
                return false;
            });
            return false;
    }

    logout(): void{
        localStorage.clear();
        this.token = undefined;
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean{
        if(localStorage.getItem('token')){
            return true;
        } else {
            return false;
        }
    }

    getToken(): string{
        return this.token;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.isAuthenticated()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }

    }



}