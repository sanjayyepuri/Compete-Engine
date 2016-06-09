import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService{
    token: string;

    constructor(private _http : Http){
        if(!localStorage.getItem('id_token')){
          localStorage.setItem('id_token', 'undefined');
        }
        this.token = localStorage.getItem('id_token');
    }

    login(teamid: String, password: String){

        return this._http.post('http://localhost:8080/api/authenticate', JSON.stringify({
            teamid: teamid,
            password: password
        }), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .map((res: any) => {
            let data = res.json();
            if(data.success)
                this.token = data.token;
            else {
              this.token = undefined;
            }
            localStorage.setItem('id_token', this.token);
            console.log(JSON.stringify(data));
        })
    }
    logout() {
        console.log('LOGOUT');
        this.token = undefined;
        localStorage.removeItem('id_token');

        return Observable.of(true);
    }
    isLoggedin() {
        return localStorage.getItem('id_token') !== 'undefined';
    }
    getThisTeam(){
      if(this.isLoggedin()){
        return new JwtHelper().decodeToken(localStorage.getItem('id_token'));
      }
      return 'undefined';
    }
    getToken(){
      var token: string = localStorage.getItem('id_token');
      if(token) return token;
    }
    getHeader(){
      var header = new Headers();
      if(this.getToken()){
        header.append('x-access-token', this.getToken());
        return header;
      }

    }
}
