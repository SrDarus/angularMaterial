import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UtilService } from 'src/app/utils/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  hide = true;
  usuario: any;
  formEditarUsuario: FormGroup
  test(a) {console.log(a)}
  constructor(
    private globalService: GlobalService,
    private usuarioService: UsuarioService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.utilService.messageBad("mensaje")
    this.usuario = JSON.parse(this.globalService.sesion)
    // console.log('suario', this.usuario)

    this.formEditarUsuario = new FormGroup({
      rut: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('')
    });
    this.usuarioService.obtenerUsuario(this.usuario.usuario).subscribe((response:any) => {
      // console.log('response', response)
      this.usuario = response.result
      if(response.status === 200) {
        this.formEditarUsuario.controls['email'].setValue(this.usuario.email);
        this.formEditarUsuario.controls['nombre'].setValue(this.usuario.nombre);
        this.formEditarUsuario.controls['apellido'].setValue(this.usuario.apellido);
        this.formEditarUsuario.controls['fechaNacimiento'].setValue(this.usuario.fechaNacimiento);
        this.formEditarUsuario.controls['rut'].setValue(this.usuario.rut);
      }else{
        this.utilService.messageBad("Problemas con el usuario")
        this.router.navigate(['/main'])
      }
    })
  }

  actualizarUsuario(): void {
    // console.log('nuevo usuario', this.formEditarUsuario)
    // console.log('Usuario', this.usuario)
    this.usuario = new Usuario(
      this.formEditarUsuario.value.email,
      this.formEditarUsuario.value.perfil,
      this.formEditarUsuario.value.rut,
      this.formEditarUsuario.value.nombre,
      this.formEditarUsuario.value.apellido,
      this.formEditarUsuario.value.fechaNacimiento,
      this.formEditarUsuario.value.fechaCreacion
    )
    // console.log("Usuario", this.usuario)
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((response: any) => {
      // console.log('response', response)
      if (response.status === 200) {
        this.utilService.messageGod("Usuario Actualizado Correctamente")
      }else {
        this.utilService.messageBad("No se pudo actualizar")
      }
    })
  }

  eliminarUsuario() {
    console.log(this.usuario)
    this.usuarioService.eliminarUsuario(this.usuario.email).subscribe((response:any)=>{
      // console.log(response)
      if(response.status  === 200){
        this.utilService.messageGod("Ha cancelado su cuenta")
        this.globalService.sesion = 'null'
        // console.log("this.globalService", this.globalService)
        this.router.navigate(['/home'])
      }else{
        this.utilService.messageBad("No pudimos cancelar su cuenta. Intentelo mas tarde")
      }
    })
  }

  getErrorMessage(value) {
    if (this.formEditarUsuario.controls.email.hasError('required')) {
      return 'El campo ' + value + ' es OBLIGATORIO';
    }
    if (this.formEditarUsuario.controls.password2.hasError('required')) {
      return 'El campo repetir password es OBLIGATORIO';
    }
    return this.formEditarUsuario.controls['email'].hasError('email') ? 'El correo electronico no es valido' : '';
  }

}
