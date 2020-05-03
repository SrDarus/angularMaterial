import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formUsuario: FormGroup
  // formUsuario: FormGroup = new FormGroup({
  //     rut: new FormControl('', Validators.required),
  //     nombre: new FormControl('', Validators.required)
  //   });
  c(a){console.log(a)}
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('data', data);
      this.formUsuario = new FormGroup({
        rut: new FormControl('', Validators.required),
        nombre: new FormControl('', Validators.required)
      });
    }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
