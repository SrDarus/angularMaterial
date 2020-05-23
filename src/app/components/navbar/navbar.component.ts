import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import { GlobalService } from 'src/app/global/global.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/utils/util.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario
  constructor(
    public dialog: MatDialog,
    private globalService: GlobalService,
    private usuarioService: UsuarioService,
    private router: Router,
    private utilService: UtilService) { 
      // globalService.theItem
    }

  ngOnInit(): void {
    this.usuario = new Usuario('', 0, '', '', '', null, null, "")
    console.log("usuario 1", this.usuario)
    if(this.globalService.sesion == 'null') {
      this.router.navigate(['home'])
    }else{
      this.router.navigate(['main'])
    }
    this.globalService.itemValue.subscribe((nextValue:any) => {
      console.log("nextValue", nextValue)
      this.usuario =JSON.parse(nextValue) as Usuario // this will happen on every change
   })
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
    });
  }

  cerrarSesion(): void {
    this.globalService.sesion = JSON.stringify(null);
    this.usuario = null
    this.router.navigate(['home'])
  }

}
