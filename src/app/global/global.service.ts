import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  _value:any

  set value(value) {
    this._value = value
  }

  get value() {
    return this._value
  }
}
