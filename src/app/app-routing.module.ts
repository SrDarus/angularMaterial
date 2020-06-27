import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NuevoUsuarioComponent } from './components/login/nuevo-usuario/nuevo-usuario.component';
import { MainComponent } from './components/main/main.component';
import { PerfilComponent } from './components/login/perfil/perfil.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { AdministrarUsuarioComponent } from './components/administrador/administrar-usuario/administrar-usuario.component';
import { AdministrarProductosComponent } from './components/administrador/administrar-productos/administrar-productos.component';
import { AuthGuard } from './services/guard/auth.guard';
import { RoleGuard } from './services/guard/role.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'administrador', component: AdministradorComponent,
      children: [
        { path: 'administrarUsuario', component: AdministrarUsuarioComponent, outlet: "administrador" },
        { path: 'administrarProductos', component: AdministrarProductosComponent, outlet: "administrador" },
        { path: '', redirectTo: 'administrarUsuario', pathMatch: 'full'},
      ] 
  },
  { path: 'administrarUsuario', component: AdministrarUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'usuario/nuevoUsuario', component: NuevoUsuarioComponent },
  { path: 'usuario/perfil', component: PerfilComponent },
  { path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'ignore'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
