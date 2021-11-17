import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissaoCooperadoRoutingModule } from './admissao-cooperado-routing.module';
import { AdmissaoCooperadoViewComponent } from './admissao-cooperado-view/admissao-cooperado-view.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import { CooperadoInfoViewComponent } from './cooperado-info-view/cooperado-info-view.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AdmissaoCooperadoViewComponent,
    CooperadoInfoViewComponent
  ],
    imports: [
        CommonModule,
        AdmissaoCooperadoRoutingModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        MatIconModule,
    ]
})
export class AdmissaoCooperadoModule { }
