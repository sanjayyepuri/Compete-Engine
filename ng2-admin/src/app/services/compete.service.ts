import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators'

import { Competitor } from '../models/competitor.model';
import { Team } from '../models/team.model';


@Injectable()
export class CompeteService {

    apiUrl: string = 'http:/localhost:8080'
    constructor(private http: Http) { }

    getAuthentication(username: string, password: string): Observable<any> {
        let body = JSON.stringify({ teamid: username, password: password });
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiUrl + '/api/authenticate', body, options)
            .map((res) => {
                let data = res.json();
                return data || {};
            })
            .catch((err) => {
                return Observable.throw(err);
            })

    }

    getTeam(): Observable<Team> {
        let headers = new Headers({
            'x-access-token': localStorage.getItem('token')
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiUrl + '/api/competitor', options)
            .map((res) => {
                let data = res.json().data;
                let team = data;

                return team || {};
            })
            .catch((err) => {
                return Observable.throw(err);
            })

    }

    updateTeam(team: Team, removed: string[]): Observable<any> {
        let headers = new Headers({
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        let body = JSON.stringify(
            {
                team: team,
                removed: removed
            });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/api/competitor/update', body, options)
            .map((res) => {
                let data = res.json();
                console.log(data);

                return data || {};
            })
            .catch((err) => {
                return Observable.throw(err);
            })

    }

    deleteMember(memberId: string): Observable<any> {
        let headers = new Headers({
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiUrl + '/api/competitor/member/delete/' + memberId, options)
            .map((res) => {
                let data = res.json();
                console.log(data);


                return data || {};
            })
            .catch((err) => {
                return Observable.throw(err);
            })
    }

    getMembers(): Observable<Competitor[]>{
        let headers = new Headers({
            'x-access-token': localStorage.getItem('token')
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiUrl + '/api/competitor/members', options)
            .map((res) => {
                let data:Competitor[] = res.json().data;

                return data || {};
            })
            .catch((err) => {
                return Observable.throw(err);
            })
    }

    getPizza(): Observable<any>{
        let headers = new Headers({
            'x-access-token': localStorage.getItem('token')
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiUrl + '/api/competitor/members', options)
            .map((res) => {
                let data:Competitor[] = res.json().data;

                return data || {};
            })
            .catch((err) => {
                return Observable.throw(err);
            })
    }
    updatePizza(): Observable<any>{
        return undefined;
    }
    postPizza(): Observable<any>{
        return undefined;
    }
}