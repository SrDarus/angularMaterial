import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/utils/util.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global/global.service';


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
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public utilService: UtilService,
    public globalService: GlobalService,
    private router: Router,
    private usuarioService: UsuarioService) {
    // console.log('data', data);
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  iniciarSesion() {
    // console.log('email', this.formLogin.value.email)
    this.usuarioService.inisiarSesion(this.formLogin.value.email).subscribe((response: any) => {
      console.log('response', response)
      if (response.status === 200  && this.formLogin.value.password === response.result.password) {
        // this.utilService.messageGod("ok")
        var session = { 
          'usuario': this.formLogin.value.email,
          'perfil': response.result.perfil
        };
        // // Guardo el objeto como un string
        // sessionStorage.setItem('session', JSON.stringify(session));
        this.globalService.sesion = JSON.stringify(session);
        this.router.navigate(['/main'])
        this.dialogRef.close();
      } else {
        this.utilService.messageBad("Usuario o Password incorrectos")
      }
    }), console.error(error=>{
      console.log("error : "+error.getMessage())
    });
    

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
