import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, NgModel } from '@angular/forms';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

interface FormTemplate {
  nome: string | null;
  email: string;
  cep: string;
  numero: string;
  complemento: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
}

// interface EndercoTemplate {
//   logradouro: string,
//   cep: string | null,
//   complemento: string,
//   bairro: string,
//   localidade: string,
//   uf: string,
// }

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: FormTemplate = {
    nome: null,
    email: 'teste@TestBed.com',
    cep: '',
    numero: '',
    complemento: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: ''
  };

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe(dados => {
        console.log(dados);
        form.form.reset();
      });
  }

  consultaCEP(cep: string, form: NgForm) {
    // Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.subscribe(dados => {
        if (!('erro' in dados)){
          this.popularDadosForm(dados, form);
        }else {
          // CEP pesquisado não foi encontrado.
          this.resetaDadosForm(form);
          alert('CEP não encontrado.');
        }
      });
    }
  }

  popularDadosForm(dados: object, formulario: NgForm){
    console.log({dados});
        // formulario.setValue({
        //     nome: formulario.value.nome,
        //     email: formulario.value.email,
        //     endereco: {
        //         rua: dados.logradouro,
        //         cep: dados.cep,
        //         complemento: dados.complemento,
        //         numero: '',
        //         bairro: dados.bairro,
        //         cidade: dados.localidade,
        //         estado: dados.uf
        //     }
        // });

    formulario.form.patchValue({
            endereco: {
                rua: dados.logradouro,
                // cep: dados.cep,
                complemento: dados.complemento,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            }
        });
    // console.log({formulario});
  }

  resetaDadosForm(formulario: NgForm){
    formulario.form.patchValue({
        endereco: {
            rua: null,
            complemento: null,
            bairro: null,
            cidade: null,
            estado: null
        }
    });
  }

  verificaValidTouched(campo: NgModel) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: NgModel) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
}
