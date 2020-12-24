import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {
    // Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep != null && cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {

        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
        
      } 
      // else {
        // cep é inválido.
        // this.resetaDadosForm(form);
        // alert('formato de CEP inválido.');
      // }
    } 
    // else {
      // cep é inválido.
      // this.resetaDadosForm(form);
    // }

    return of ({});
  }
}
