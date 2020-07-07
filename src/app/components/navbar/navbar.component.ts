import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/utils/util.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppSettings } from 'src/app/app.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  url:string = AppSettings.API_ENDPOINT_LOCAL
  usuario: Usuario = null
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    public authService: AuthService,
    public utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    this.authService.historial.subscribe((nextValue: any) => {
      if (nextValue === null) {
        // this.usuario = new Usuario("", [], "", "", "", "", "", "", false)
        this.usuario = null
      } else {
        this.usuario = nextValue
        console.log("historial", this.usuario) 
      }
    })
    if (!this.authService.isAuthenticated()) {
      // this.usuario = new Usuario("", [], "", "", "", "", "", "", false)
      this.usuario = null
      this.router.navigate(['/home']) 
    } else {
      this.usuarioService.obtenerUsuario(this.usuario.email).subscribe(response => {
        if (response.status === 200) {
          console.log("resposne.result", response.result)
          this.authService.historial.next(response.result)
          this.usuario = response.result
        }
      })
      this.router.navigate(['/main'])
    }
    console.log("usuario", this.usuario)
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
    });
  }

  cerrarSesion(): void {
    this.usuario = null
    this.authService.cerrarSesion()
    this.utilService.messageWarning("Sesion Cerrada")
    this.router.navigate(['home'])
  }

  hasRole(role) {
    // console.log("role", role)
    return this.authService.hasRole(role);
  }

}



