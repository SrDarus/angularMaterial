import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { UtilService } from 'src/app/utils/util.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global/global.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',

  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  formNuevoUsuario: FormGroup
  usuario: Usuario
  hide = true;


  test(a?){console.log(a)}
  constructor(
    private usuarioService: UsuarioService,
    private utilsService: UtilService,
    private router: Router,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {

    this.formNuevoUsuario = new FormGroup({
      rut: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', [Validators.required])
    });
  }



  iniciarSesion() {
    let sendIniciarSesion = {}
    //this.usuarioService.inisiarSesion().subscribe(response=>{

    //})
  }

  registrarUsuario(): void {
    // console.log('nuevo usuario', this.formNuevoUsuario)
    this.usuario = new Usuario(
      this.formNuevoUsuario.value.email,
      this.formNuevoUsuario.value.perfil,
      this.formNuevoUsuario.value.rut,
      this.formNuevoUsuario.value.nombre,
      this.formNuevoUsuario.value.apellido,
      this.formNuevoUsuario.value.fechaNacimiento,
      this.formNuevoUsuario.value.fechaCreacion,
      this.formNuevoUsuario.value.password
    )
    // console.log("Usuario", this.usuario)
    this.usuarioService.registrarUsuario(this.usuario).subscribe((response: any) => {
      // console.log('response', response)
      if (response.status === 200) {
        this.utilsService.messageGod("Usuario Registrado")
        // console.log('response.email', response.result.email)
        var session = { 'usuario': response.result.email};
        this.globalService.sesion = JSON.stringify(session);
        this.router.navigate(['/main'])
      }else{
        if(response.status === 409){
          this.utilsService.messageBad("El email ingresado ya existe")
        }
        else {
          this.utilsService.messageBad("No se pudo registrar este Usuario")
        }
      }
    })
  }

  getErrorMessage(value) {
    if (this.formNuevoUsuario.controls.email.hasError('required')) {
      return 'El campo ' + value + ' es OBLIGATORIO';
    }
    if (this.formNuevoUsuario.controls.password2.hasError('required')) {
      return 'El campo repetir password es OBLIGATORIO';
    }
    return this.formNuevoUsuario.controls['email'].hasError('email') ? 'El correo electronico no es valido' : '';
  }


  // ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   console.log('password)', control)
  //   //console.log('password', this.password())
  //   if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
  //     return { 'ageRange': true };
  //   }
  //   return null;
  // }

  get password() {
    return this.formNuevoUsuario.value.password
  }

  compararPassword(event) {
    // console.log('event', event)
    // console.log(this.formNuevoUsuario)
    if(this.formNuevoUsuario.value.password !== this.formNuevoUsuario.value.password2){
      this.utilsService.messageBad("No coinciden los password")
      this.formNuevoUsuario.controls['password2'].setValue('')
    }

  }

}
