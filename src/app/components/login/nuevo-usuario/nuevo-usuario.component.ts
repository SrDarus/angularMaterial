import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  formNuevoUsuario: FormGroup
  usuario: Usuario
  hide = true;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.formNuevoUsuario = new FormGroup({
      rut: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    });
    this.obtenerUsuario()
  }

  registrarUsuario() {
    console.log('nuevo usuario', this.formNuevoUsuario)
    let jsonUsuario = {
      
    }
    this.usuarioService.registrarUsuario(jsonUsuario).subscribe((result:any) => {
      if(result.status===200){
        alert(1)
      }
    })
  }

  obtenerUsuario(){
    this.usuarioService.obtenerUsuarios().subscribe((result:any) => {
      console.log('result', result)
      if(result.status===200){
        alert(1)
      }
    })
  }

  getErrorMessage(value) {
    if (this.formNuevoUsuario.controls.email.hasError('required')) {
      return 'El campo '+value+' es OBLIGATORIO' ;
    }
    return this.formNuevoUsuario.controls['email'].hasError('email') ? 'El correo electronico no es valido' : '';
  }

}
