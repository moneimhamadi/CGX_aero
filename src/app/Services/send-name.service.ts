import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendNameService {
  shareName = new Subject<any>();
  shareName$ = this.shareName.asObservable();
  sendName(name: string) {
    this.shareName.next(name);
  }
  getName(): Observable<any> {
    return this.shareName.asObservable();
  }
  constructor() {}
}
