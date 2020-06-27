import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/utils/util.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global/global.service';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup
  hidePassword = true;

  @ViewChild('logo')
  logo: ElementRef<HTMLCanvasElement>

  test(a) { console.log(a) }
  constructor(
    public dialogRefLogin: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public utilService: UtilService,
    public globalService: GlobalService,
    private router: Router,
    private authService:AuthService) {
    // console.log('data', data);
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  iniciarSesion() { 
    // console.log("formLogin", this.formLogin)
    this.authService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe((response: any) => {
      console.log("response", response)
      this.authService.guardarUsuario(response.access_token)
      this.authService.guardarToken(response.access_token)
      this.utilService.messageGod(`Bienvenido ${response.email}`)
      this.router.navigate(['/main'])
      this.dialogRefLogin.close();
    }, (error:HttpErrorResponse) => {
        if (error.status === 400) {
          this.utilService.messageBad("Usuario o Password incorrecto")
        }
    })

    /*
    this.usuarioService.inisiarSesion(this.formLogin.value.email).subscribe((response: any) => {
      console.log("resposne", response)
      if (response.status === 200) {
        if(this.formLogin.value.password != response.result.password){
          this.utilService.messageBad("Contraseña insersada incorrecta");
          return
        }
        // this.utilService.messageGod("ok")
        let usuario:Usuario = response.result;
        console.log("usuario", usuario)
        // Guardo el objeto como un string
        this.globalService.sesion = JSON.stringify(usuario);
        this.router.navigate(['/main'])
        this.dialogRef.close();
      }
      else {
        if(response.status === 404){
          this.utilService.messageBad("El usuario Ingresado no existe")
        }else{
            this.utilService.messageBad("Problemas con el servidor. Contactese con el administrador")
        }
      }
    },
    error => {
      if(error){
        console.log("ERROR", error)
        console.log("ERROR", error.status)
        this.utilService.messageBad("Problemas con el servidor contactese con el administrador");
      }
    });
    */
  }

  enterIniciarSesion(event) {
    // event.preventDefault()
    // this.iniciarSesion()
    console.log(this.formLogin)
  }

  onNoClick(): void {
    this.dialogRefLogin.close();
  }


}