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

  //PAGINACION DESDE EL BACKENS
  dsUsuariosBack: any
  pagina: number = 0;
  _paginationButtons: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private globalService: GlobalService,
    private router: Router,
    private utilService: UtilService) { }

  ngOnInit(): void {

    this._paginationButtons = {
      empty: false,
      first: true,
      last: false,
      number: 0,
      numberOfElements: 10,
      pageable: { sort: {}, offset: 0, pageSize: 10, pageNumber: 0, paged: true },
      size: 10,
      sort: { sorted: false, unsorted: true, empty: true },
      totalElements: 23,
      totalPages: 3,
    }

    this.usuarioService.obtenerUsuarios().subscribe((response: any) => {
      console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuarios = new MatTableDataSource<Usuario>(response.result);
        this.dsUsuarios.paginator = this.paginator;
      }
    })
    this.usuarioService.obtenerUsuariosBack(this.pagina).subscribe((response: any) => {
      // console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuariosBack = response.result.content;
        this._paginationButtons = response.result;
        // this._paginationButtons = response
        this._paginationButtons = response.result
        delete this._paginationButtons.content
        console.log('test', this._paginationButtons)

      }
    })
  }

  buscarSiguiente() {
    this.pagina = this.pagina + 1
    console.log('pagina', this.pagina)
    this.usuarioService.obtenerUsuariosBack(this.pagina).subscribe((response: any) => {
      console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuariosBack = response.result.content;
        this._paginationButtons = response.result;
        // this._paginationButtons = response
        this._paginationButtons = response.result
        delete response.result.content
        console.log('test', this._paginationButtons)
      }
    })
  }

  buscarAnterior() {
    this.pagina = this.pagina - 1
    console.log('pagina', this.pagina)
    this.usuarioService.obtenerUsuariosBack(this.pagina).subscribe((response: any) => {
      console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuariosBack = response.result.content;
        this._paginationButtons = response.result;
        // this._paginationButtons = response
        this._paginationButtons = response.result
        delete response.result.content
        console.log('test', this._paginationButtons)
      }
    })
  }

  get paginationButtons() {
    return this._paginationButtons
  }
}
