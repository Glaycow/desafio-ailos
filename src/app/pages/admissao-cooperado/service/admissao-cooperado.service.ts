import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cooperado} from "../model/cooperado";

@Injectable({
  providedIn: 'root'
})
export class AdmissaoCooperadoService {
  private baseUrl = "http://localhost:3000/cooperado";
  constructor(private http: HttpClient) { }

  buscarCooperadoPeloCpf(cpf: string): Observable<Cooperado> {
    return this.http.get<Cooperado>(`${this.baseUrl}?cpf=${cpf}`)
      // ajuste para retornar o objeto de Cooperado invés de uma coleção de Cooperado
      .pipe(
        map(c => {
          const cooperado : any = c;
         if(cooperado.length === 1) {
           return cooperado[0];
         } else {
           return  null;
         }
        })
      );
  }
}
