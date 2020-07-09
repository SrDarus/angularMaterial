import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UtilService } from 'src/app/utils/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  hide = true;
  usuario: any;
  formEditarUsuario: FormGroup
  foto: any;
  progreso: number = 0

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  progresoValue = 0;
  bufferValue = 100;
  test(a) { console.log(a) }

  sub

  constructor(
    public authService: AuthService,
    private usuarioService: UsuarioService,
    public utilService: UtilService,
    private router: Router,
    private activedRouter:  ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.usuario

    this.formEditarUsuario = new FormGroup({
      rut: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('')
    });
    this.usuarioService.obtenerUsuario(this.usuario.email).subscribe((response: any) => {
      // console.log('response', response)
      if (response.status === 200) {
        this.usuario = response.result
        // console.log('suario', this.usuario)
        this.formEditarUsuario.controls['email'].setValue(this.usuario.email);
        this.formEditarUsuario.controls['nombre'].setValue(this.usuario.nombre);
        this.formEditarUsuario.controls['apellido'].setValue(this.usuario.apellido);
        this.formEditarUsuario.controls['fechaNacimiento'].setValue(this.usuario.fechaNacimiento);
        this.formEditarUsuario.controls['rut'].setValue(this.usuario.rut);
      } else {
        this.utilService.messageBad("Problemas con el usuario")
        this.router.navigate(['/main'])
      }
    })
    this.sub = this.activedRouter
    .data
    .subscribe(v => console.log("v",v));
}

ngOnDestroy() {
  this.sub.unsubscribe();
}
  actualizarUsuario(): void {
    console.log('nuevo usuario', this.formEditarUsuario)
    this.usuario = new Usuario(
      this.formEditarUsuario.value.email,
      null,
      this.formEditarUsuario.value.rut,
      this.formEditarUsuario.value.nombre,
      this.formEditarUsuario.value.apellido,
      this.formEditarUsuario.value.fechaNacimiento,
      this.formEditarUsuario.value.foto,
      null,
      null
    )
    console.log("Usuario", this.usuario)
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((response: any) => {
      console.log('response', response)
      if (response.status === 200) {
        this.usuario = response.result
        this.authService.historial.next(this.usuario);
        this.utilService.messageGod("Usuario Actualizado Correctamente")
      } else {
        this.utilService.messageBad("No se pudo actualizar")
      }
    })
  }

  eliminarUsuario() {
    this.usuarioService.eliminarUsuario(this.usuario.email).subscribe((response: any) => {
      // console.log(response)
      if (response.status === 200) {
        this.utilService.messageGod("Ha cancelado su cuenta")
        // this.globalService.sesion = 'null'
        // console.log("this.globalService", this.globalService)
        this.router.navigate(['/home'])
      } else {
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

  private srcResult
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  seleccionarFoto(foto) {
    this.foto = foto[0]
    this.progreso = 0
    if (this.foto.type.indexOf('image') < 0) {
      console.log("this.foto.type", this.foto.type)
      this.foto = null
      this.utilService.messageBad("Debe serleccionar un formato para imagen")
    }
  }

  subirFoto() {
    if (!this.foto) {
      this.utilService.messageBad("Debe seleccionar una foto");
    }
    this.usuarioService.subirFotoUsuario(this.foto, this.usuario.email).subscribe(
      (event:any) => {
        // console.log('event', event)
        // console.log('total', event.total)
        if(event.type === HttpEventType.UploadProgress){
          const subido = Math.round(100 * event.loaded / event.total);
          this.progresoValue = subido;
          console.log("progresoValue", this.progresoValue)
          this.utilService.messageWarning(subido)
        }else {
          if(event.type === HttpEventType.Response){
            let response = event.body
            if (response.status === 200) {
              console.log("response", response)
              this.usuario = response.result
              this.authService.historial.next(this.usuario);
              // this.usuario.foto = response.result.foto
              this.utilService.messageGod("Imagen subida correntamente")
              this.progresoValue = 0
            }

          }
          this.progresoValue = 0
        }
      }, (error) => {
        this.utilService.messageBad("Problemas con el servidor. contacte con un admnistrador")
      }
    )
  }

}
