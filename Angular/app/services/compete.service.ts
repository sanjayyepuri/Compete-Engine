import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
declare var io: any;

@Injectable()
export class CompeteService {
  constructor(private _http: AuthHttp, private _auth: AuthenticationService){

  }
  getTeams(){

     return this._http.get('http://localhost:8080/api/competitor/teams', {
      headers : this._auth.getHeader()
    })
    .map((res: any) => {
      let data = res.json();
      console.log(data);
    });
  }
}
