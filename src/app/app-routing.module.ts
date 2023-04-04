import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AvaliacoesComponent } from './components/avaliacoes/avaliacoes.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'avaliacoes', component: AvaliacoesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
