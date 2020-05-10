import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import { GlobalService } from 'src/app/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private globalService: GlobalService,
    private router: Router) { }

  ngOnInit(): void {
    console.log()
    if(!this.globalService.theItem) {
      this.router.navigate(['home'])
    }else{
      this.router.navigate(['main'])
    }
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
      // data: {authUser: 'darus'}
      // data: {authUser: this.authUser.usuario}
    });
  }



}
