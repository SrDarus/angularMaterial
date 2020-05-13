import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import { GlobalService } from 'src/app/global/global.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/utils/util.service';

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
    private router: Router,
    private utilService: UtilService) { 
      // globalService.theItem
    }

  ngOnInit(): void {
    if(this.globalService.sesion == 'null') {
      this.router.navigate(['home'])
    }else{
      this.router.navigate(['main'])
    }
    this.globalService.itemValue.subscribe((nextValue) => {
      console.log("nextValue", nextValue)
      this.sesion = nextValue;  // this will happen on every change
   })
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
    });
  }

  cerrarSesion(): void {
    this.globalService.sesion = JSON.stringify(null);
    this.sesion = 'null'
    this.utilService.messageWarning("Sesión Cerrada")
  }

}
