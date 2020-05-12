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
    this.usuario = JSON.parse(this.globalService.sesion)
    console.log('suario', this.usuario)

    this.formEditarUsuario = new FormGroup({
      rut: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl('', Validators.required)
    });
    this.usuarioService.obtenerUsuario(this.usuario.usuario).subscribe(result => {
      console.log('result', result)
      this.usuario = result
      //if(result['status'] === 200) {
      //}
      this.formEditarUsuario.controls['email'].setValue(result['email']);
      this.formEditarUsuario.controls['nombre'].setValue(result['nombre']);
      this.formEditarUsuario.controls['apellido'].setValue(result['apellido']);
      this.formEditarUsuario.controls['fechaNacimiento'].setValue(result['fechaNacimiento']);
      this.formEditarUsuario.controls['rut'].setValue(result['rut']);
    })
  }

  actualizarUsuario(): void {
    console.log('nuevo usuario', this.formEditarUsuario)
    console.log('Usuario', this.usuario)
    this.usuario = new Usuario(
      this.formEditarUsuario.value.email,
      this.formEditarUsuario.value.perfil,
      this.formEditarUsuario.value.rut,
      this.formEditarUsuario.value.nombre,
      this.formEditarUsuario.value.apellido,
      this.formEditarUsuario.value.fechaNacimiento,
      this.formEditarUsuario.value.fechaCreacion,
    )
    console.log("Usuario", this.usuario)
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((result: any) => {
      console.log('result', result)
      if (result.status === 201) {
        // alert(1)
        //201 usuario creado
        //204 no content 
      }
      this.utilService.messageGod("Usuario Actualizado Correctamente")
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

  eliminarUsuario() {
    console.log(this.usuario)
    this.usuarioService.eliminarUsuario(this.usuario.email).subscribe((result:any)=>{
      console.log(result)
      this.utilService.messageGod("Ha cancelado su cuenta")
      this.router.navigate(['/main'])
    })
  }

}
