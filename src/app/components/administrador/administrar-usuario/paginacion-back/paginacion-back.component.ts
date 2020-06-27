import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/app/utils/util.service';
import { GlobalService } from 'src/app/global/global.service';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-paginacion-back',
  templateUrl: './paginacion-back.component.html',
  styleUrls: ['./paginacion-back.component.css'],
  animations: [
    trigger('formExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaginacionBackComponent implements OnInit {
  columnsToDisplay: Array<string> = ['email', 'rut', 'nombre', 'apellido', 'fechaNacimiento', 'fechaCreacion'];
  expandedElement: Usuario | null
  dsUsuarios: Array<Usuario>

  formUsuario: FormGroup
  usuario: Usuario
  roleSelected: number

  pagina: number = 0;
  _paginationButtons: any

  constructor(
    private usuarioService: UsuarioService,
    private utilService: UtilService,
    private globalService: GlobalService

  ) { }

  ngOnInit(): void {
    // this.usuario = JSON.parse(this.globalService.sesion)
    // console.log(this.usuario)
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

    this.formUsuario = new FormGroup({
      rut: new FormControl(this.usuario.rut),
      // role: new FormControl(this.usuario.role.idRole, Validators.required),
      role: new FormControl(null, Validators.required),
      email: new FormControl(this.usuario.email, [Validators.email, Validators.required]),
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      apellido: new FormControl(this.usuario.apellido),
      fechaNacimiento: new FormControl(this.usuario.fechaNacimiento)
    });
    // this.formUsuario.reset()

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

  actualizarUsuario() {
  /*
    // console.log("formUsuario", this.formUsuario)
    let roleSeleccionado = this.roles.find(role => role.idRole === this.formUsuario.value.role)
    this.usuario = new Usuario(
      this.formUsuario.value.email,
      roleSeleccionado as Role,
      this.formUsuario.value.rut,
      this.formUsuario.value.nombre,
      this.formUsuario.value.apellido,
      this.formUsuario.value.fechaNacimiento,
      this.formUsuario.value.fechaCreacion,
      "",
      this.formUsuario.value.password
    )
    // console.log("usuario", this.usuario)
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((response: any) => {
      // console.log("response", response)
      if (response.status === 200) {
        this.utilService.messageGod("Usuario modificado correctamente")
      }else{
        this.utilService.messageBad("Problemas con el servidor. Contacte con el area de soporte")
      }
    })
    */
  }

  seleccionarUsuario(event) {
    // console.log(event)
    this.roleSelected = event.role.idRole
    this.formUsuario = new FormGroup({
      rut: new FormControl(event.rut),
      role: new FormControl(null, Validators.required),
      email: new FormControl(event.email, [Validators.email, Validators.required]),
      nombre: new FormControl(event.nombre, Validators.required),
      apellido: new FormControl(event.apellido),
      fechaNacimiento: new FormControl(this.utilService.fechaFront(event.fechaNacimiento))
    });
    // console.log(this.formUsuario)
    // this.formUsuario.controls.role
  }
}