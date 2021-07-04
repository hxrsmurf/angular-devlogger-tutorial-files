import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({ id: '', text: '', date: '' });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [];
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated components',
    //     date: new Date('12/26/2017 12:54:23')
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date('12/27/2017 12:54:23')
    //   }
    // ]
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      //this.logs = Logs[];
      console.log('No Logs');
    } else {
      console.log('Logs');
      //this.logs = JSON.parse(localStorage.getItem('logs'));
      //console.log(localStorage.getItem('logs'));
    }

    /* 
    logs:"[{"id":"c9f02627-152b-4861-bf5c-ebe2c0f42e45","text":"Test","date":"2021-07-04T23:16:24.322Z"}]"
    */
    return of(this.logs.sort((a, b) => {
      return b.date = a.date
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to Local Storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    
    // Add to Local Storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });

    // Add to Local Storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true)
  }

}
