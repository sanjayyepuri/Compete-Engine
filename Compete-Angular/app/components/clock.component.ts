import { Component, OnInit } from 'angular2/core';

declare var io: any;

@Component({
    selector: 'clock',
    templateUrl: 'app/components/html/clock.component.html'
})
export class ClockComponent implements OnInit {
    socket: any;
    time: string;

    constructor() {
        this.socket = io.connect('http://localhost:8080/');
    }
    ngOnInit() {
        this.socket.on('time', (data) => {
            this.time = data.time;
        })
    }

}