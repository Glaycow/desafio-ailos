import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {FormBuilder, FormControlName, FormGroup, Validators} from "@angular/forms";
import {ValidationMessages} from "../../../shared/models/validation-messages";
import {GenericValidator} from "../../../shared/models/generic-form-validation";
import {DisplayMessage} from "../../../shared/models/display-message";
import {fromEvent, merge, Observable} from "rxjs";
import {Validacoes} from "../../../shared/models/validacoes";
import {AdmissaoCooperadoService} from "../service/admissao-cooperado.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Cooperado} from "../model/cooperado";

@Component({
  selector: 'app-admissao-cooperado-view',
  templateUrl: './admissao-cooperado-view.component.html',
  styleUrls: ['./admissao-cooperado-view.component.scss']
})
export class AdmissaoCooperadoViewComponent implements OnInit, AfterViewInit {
  cooperadoForm!: FormGroup;
  cooperado!: Cooperado;
  msgValidacao!: string | undefined;
  msgConsultaCooperado!: string | undefined;
  statusConsultaCooperado: boolean = false;
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements!: ElementRef[];

  constructor(private fb: FormBuilder, private admissaoCooperadoService: AdmissaoCooperadoService) {
    this.validationMessages = {
      cpf: {
        required: 'O CPF é requerido <br>',
        cpfInvalido: 'CPF inválido'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {
    let controlsBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur'));
    merge(...controlsBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cooperadoForm);
    });
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm(): void {
    this.cooperadoForm = this.fb.group({
      cpf: ['', [Validators.required, Validacoes.ValidaCpf]]
    });
  }

  buscarCooperado(): void {
    if (this.cooperadoForm.valid) {
      this.msgValidacao = undefined;
      this.msgConsultaCooperado = undefined;
      this.statusConsultaCooperado = false;
      this.admissaoCooperadoService.buscarCooperadoPeloCpf(this.cooperadoForm.get('cpf')?.value)
        .subscribe(
          result => {
            if (result === null) {
              this.msgConsultaCooperado = "Não foi encontrado informações do Cooperado pelo CPF, tente mais tarde!";
              this.statusConsultaCooperado = false;
            } else {
              this.statusConsultaCooperado = true;
              this.cooperado = result;
            }
          },
          (err: HttpErrorResponse) => {
            this.msgValidacao = "Não foi possível encontrar informações do CPF fornecido, tente mais tarde!"
          }
        );
    } else {
      this.msgValidacao = "Preencha o CPF corretamente";
    }
  }

}
