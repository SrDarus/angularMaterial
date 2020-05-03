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
  constructor() { }

  ngOnInit(): void {
    this.formNuevoUsuario = new FormGroup({
      rut: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

}
