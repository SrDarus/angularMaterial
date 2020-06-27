import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/utils/util.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario = null
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private utilService: UtilService,
    private usuarioService: UsuarioService) {
    // globalService.theItem
  }

  ngOnInit(): void {
    this.authService.historial.subscribe((nextValue: any) => {
      console.log("nextValue", nextValue)
      if (nextValue === null) {
        this.usuario = null
      } else {
        this.usuario = nextValue
      }
    })

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home']) 
    } else {
      this.usuarioService.obtenerUsuario(this.usuario.email).subscribe(response => {
        // console.log("response", response)
        if (response.status === 200) {
          this.authService.historial.next(response.result)
        }
      })
      // console.log("Usuario", this.usuario)
      this.router.navigate(['/main'])
    }

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['main'])
    }

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



