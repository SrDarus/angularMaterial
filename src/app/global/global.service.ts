import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  itemValue = new BehaviorSubject(this.sesion);

  set sesion(value) {
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('sesion', value);
    // sessionStorage.setItem('sesion', value);
  }

  get sesion() {
    return localStorage.getItem('sesion');
    // return sessionStorage.getItem('sesion');
  }
}
