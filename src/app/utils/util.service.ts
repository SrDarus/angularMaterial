import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {    
    let config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ['mat-danger'];
    config.horizontalPosition = 'center'
    config.verticalPosition = 'top'
    this._snackBar.open("This is a message!", "ACTION", config);
  }

  messageBad(message) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['mat-danger'];
    config.horizontalPosition = 'center'
    config.verticalPosition = 'top',
    this._snackBar.open(message, null, config);
  }

  messageGod(message) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['mat-succes'];
    config.horizontalPosition = 'center'
    config.verticalPosition = 'top',
    // config.panelClass = ['mycsssnackbartest ']
    this._snackBar.open(message, null, config);
  }

  messageWarning(message) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['mat-warning'];
    config.horizontalPosition = 'end'
    config.verticalPosition = 'top',
    // config.panelClass = ['mycsssnackbartest ']
    this._snackBar.open(message, null, config);
  }
  
}
