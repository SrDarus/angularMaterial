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
  sesion:string = 'null'
  constructor(
    public dialog: MatDialog,
    private globalService: GlobalService,
    private router: Router) { 
      // globalService.theItem
    }

  ngOnInit(): void {
    if(!this.globalService.sesion) {
      this.router.navigate(['home'])
    }else{
      this.router.navigate(['main'])
    }
    this.globalService.itemValue.subscribe((nextValue) => {
      console.log(nextValue)
      console.log('typeof', typeof nextValue)
      this.sesion = nextValue;  // this will happen on every change
   })
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
      // data: {authUser: 'darus'}
      // data: {authUser: this.authUser.usuario}
    });
  }

  cerrarSesion(): void {
    this.globalService.sesion = JSON.stringify(null);
    this.sesion = 'null'
  }

}
