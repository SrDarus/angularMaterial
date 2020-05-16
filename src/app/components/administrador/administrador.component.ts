import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/global/global.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/utils/util.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {


  displayedColumns: string[] = ['email', 'rut', 'nombre', 'apellido', 'fechaNacimiento', 'fechaCreacion'];
  dsUsuarios: any
  dsUsuariosBack: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private globalService: GlobalService,
    private router: Router,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((response: any) => {
      console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuarios = new MatTableDataSource<Usuario>(response.result);
        this.dsUsuarios.paginator = this.paginator;
      }
    })
    let pagina = 2
    this.usuarioService.obtenerUsuariosBack(pagina).subscribe((response: any) => {
      console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuariosBack = response.result.content;
      }
    })
  }

}
