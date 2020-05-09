import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { UtilService } from 'src/app/utils/util.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',

  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  formNuevoUsuario: FormGroup
  usuario: Usuario
  hide = true;


  test(a?){console.log(a)
  }

  constructor(
    private usuarioService: UsuarioService,
    private utilsService: UtilService
  ) { }

  ngOnInit(): void {

    this.formNuevoUsuario = new FormGroup({
      rut: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', [Validators.required, this.ageRangeValidator])
    });
    this.obtenerUsuario()
  }



  iniciarSesion() {
    let sendIniciarSesion = {}
    //this.usuarioService.inisiarSesion().subscribe(result=>{

    //})
  }

  registrarUsuario(): void {
    console.log('nuevo usuario', this.formNuevoUsuario)
    console.log('Usuario', this.usuario)
    this.usuario = new Usuario(
      this.formNuevoUsuario.value.email,
      this.formNuevoUsuario.value.perfil,
      this.formNuevoUsuario.value.rut,
      this.formNuevoUsuario.value.nombre,
      this.formNuevoUsuario.value.apellido,
      this.formNuevoUsuario.value.fechaNacimiento,
      this.formNuevoUsuario.value.fechaCreacion,
    )
    console.log("Usuario", this.usuario)
    this.usuarioService.registrarUsuario(this.usuario).subscribe((result: any) => {
      console.log('result', result)
      if (result.status === 201) {
        // alert(1)

        //201 usuario creado
        //204 no content 
      }
    })
  }

  obtenerUsuario() {
    this.usuarioService.obtenerUsuarios().subscribe((result: any) => {
      console.log('result', result)
      if (result.status === 200) {
        alert(1)
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


  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    console.log('password)', control)
    //console.log('password', this.password())
    if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
      return { 'ageRange': true };
    }
    return null;
  }

  get password() {
    return this.formNuevoUsuario.value.password
  }

  compararPassword(event) {
    console.log('event', event)

  }

}
