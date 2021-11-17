import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admissao-cooperado',
    pathMatch: 'full'
  },
  {
    path: 'admissao-cooperado',
    loadChildren: () => import('./pages/admissao-cooperado/admissao-cooperado.module').then(m => m.AdmissaoCooperadoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
