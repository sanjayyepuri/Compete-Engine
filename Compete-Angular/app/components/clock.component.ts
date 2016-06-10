import { Component, OnInit } from '@angular/core';

declare var io: any;

@Component({
    selector: 'clock',
    templateUrl: 'app/components/html/clock.component.html'
})
export class ClockComponent implements OnInit {
    socket: any;
    time: string;
    countdown: any;

    constructor() {
        this.socket = io.connect('http://localhost:8080/');
        this.countdown= 'Not Started'
    }
    ngOnInit() {
        this.socket.on('time', (data) => {
            this.time = data.time;
        })
        this.socket.on('timer', (data) => {
            this.countdown = data.countdown;
        })
    }

}
