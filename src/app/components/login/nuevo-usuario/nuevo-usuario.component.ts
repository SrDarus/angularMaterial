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
  edades: Array<number> = []
  constructor() { }

  ngOnInit(): void {
    this.formNuevoUsuario = new FormGroup({
      rut: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }

  crearNuevoUsuario() {
    [{
      "rut": "104444199",
      "nombre": "margarita",
      "fechaNacimiento": "2020-04-29T04:00:00.000+0000",
      "usuario": "magi",
      "password": "Caradej1",
      "fecha": "2020-04-29",
      "perfil": 2
    }];
  }

}
