import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  // private loggedIn = new BehaviorSubject<boolean>(false);

  // setLoggedIn(value: boolean) {
  //   this.loggedIn.next(value);
  // }

  // getLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }
}
