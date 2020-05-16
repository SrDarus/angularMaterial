import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NuevoUsuarioComponent } from './components/login/nuevo-usuario/nuevo-usuario.component';
import { MainComponent } from './components/main/main.component';
import { PerfilComponent } from './components/login/perfil/perfil.component';
import { AdministradorComponent } from './components/administrador/administrador.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'usuario/nuevoUsuario', component: NuevoUsuarioComponent },
  { path: 'usuario/perfil', component: PerfilComponent },
  { path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
