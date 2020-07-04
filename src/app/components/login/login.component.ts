import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/app/utils/util.service';
import { Router } from '@angular/router';
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
    private router: Router,
    public authService:AuthService) {
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
  }

  enterIniciarSesion(event) {
    console.log(this.formLogin)
  }

  onNoClick(): void {
    this.dialogRefLogin.close();
  }


}