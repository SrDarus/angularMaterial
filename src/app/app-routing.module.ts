import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NuevoUsuarioComponent } from './components/login/nuevo-usuario/nuevo-usuario.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'usuario/nuevoUsuario', component: NuevoUsuarioComponent },
  { path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
