import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '40%',
      data: {authUser: 'darus'}
      // data: {authUser: this.authUser.usuario}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
    });
  }



}
