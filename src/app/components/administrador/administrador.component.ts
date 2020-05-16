import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/global/global.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/utils/util.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  
  displayedColumns: string[] = ['email', 'rut', 'nombre', 'apellido', 'fechaNacimiento', 'fechaCreacion'];
  dsUsuarios: Array<Usuario>

  constructor(
    private usuarioService: UsuarioService,
    private globalService: GlobalService,
    private router: Router,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((response:any)=>{
      console.log("*********************", response)
      if(response.status === 200){
        this.dsUsuarios = response.result
      }
    })
  }

}
