import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { BuscaComponent } from './pages/busca/busca.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'filmes/detalhes',
    component: DetalhesFilmeComponent,
  },
  {
    path: 'filmes/busca',
    component: BuscaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
