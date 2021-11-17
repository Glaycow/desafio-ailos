import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdmissaoCooperadoViewComponent} from "./admissao-cooperado-view/admissao-cooperado-view.component";

const routes: Routes = [
  {
    path: '',
    component: AdmissaoCooperadoViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissaoCooperadoRoutingModule { }
