import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from 'angular2/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService{
    token: string;

    constructor(private _http : Http){
        this.token = localStorage.getItem('token');
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
        console.log(localStorage.getItem('id_token') !== 'undefined');
        return localStorage.getItem('id_token') !== 'undefined';
    }
    getThisTeam(){
      console.log(this.isLoggedin());
      if(this.isLoggedin()){
        return new JwtHelper().decodeToken(localStorage.getItem('id_token'));
      }
      return 'undefined';
    }
}
