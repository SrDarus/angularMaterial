import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Usuario } from 'src/app/models/usuario';
import { Perfil } from 'src/app/models/perfil';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-paginacion-back',
  templateUrl: './paginacion-back.component.html',
  styleUrls: ['./paginacion-back.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaginacionBackComponent implements OnInit {
  columnsToDisplay: Array<string> = ['email', 'rut', 'nombre', 'apellido', 'fechaNacimiento', 'fechaCreacion'];
  expandedElement: Usuario | null
  dsUsuarios: Array<Usuario>

  formUsuario: FormGroup

  pagina: number = 0;
  _paginationButtons: any
  perfiles: Array<Perfil>;

  constructor(
    private usuarioService: UsuarioService
  ) { }

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
    let perfil = new Perfil(0, '');

    this.usuarioService.obtenerPerfiles().subscribe((response:any)=>{
      console.log("response", response)
      if(response.status===200){
        this.perfiles = response.result
      }
    })

    this.formUsuario = new FormGroup({
      rut: new FormControl(''),
      perfil: new FormControl(null, Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl(''),
      fechaNacimiento: new FormControl('')
    });



    this.usuarioService.obtenerUsuariosBack(this.pagina).subscribe((response: any) => {
      // console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuarios = response.result.content;
        this._paginationButtons = response.result;
        // this._paginationButtons = response
        this._paginationButtons = response.result
        delete this._paginationButtons.content
        // console.log('test', this._paginationButtons)

      }
    })
  }

  
  buscarSiguiente() {
    this.pagina = this.pagina + 1
    console.log('pagina', this.pagina)
    this.usuarioService.obtenerUsuariosBack(this.pagina).subscribe((response: any) => {
      console.log("*********************", response)
      if (response.status === 200) {
        this.dsUsuarios = response.result.content;
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
        this.dsUsuarios = response.result.content;
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