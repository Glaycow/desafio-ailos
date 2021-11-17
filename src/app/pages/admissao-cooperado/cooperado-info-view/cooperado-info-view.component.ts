import {Component, Input} from '@angular/core';
import {Cooperado} from "../model/cooperado";

@Component({
  selector: 'app-cooperado-info-view',
  templateUrl: './cooperado-info-view.component.html',
  styleUrls: ['./cooperado-info-view.component.scss']
})
export class CooperadoInfoViewComponent {

  @Input()
  cooperado!: Cooperado;
}
