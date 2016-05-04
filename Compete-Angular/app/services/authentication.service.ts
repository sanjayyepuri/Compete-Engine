import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from 'angular2/http';

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
            localStorage.setItem('token', this.token);
            console.log(JSON.stringify(data));
        })
    }
    
    logout() {
        this.token = undefined;
        localStorage.removeItem('token');
        
        return Observable.of(true);
    }
}