import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
      // endereco: new FormGroup({
      //   cep: new FormControl(null)
      // })
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.min(3)]],
      email: [null, [Validators.required, Validators.email]],
      
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        rua: [null, Validators.required],
        complemento: [null],
        estado: [null, Validators.required],
        numero: [null, Validators.required],
        cidade: [null, Validators.required],
        bairro: [null, Validators.required],
      })
    })

  }

  onSubmit() {
    console.log(this.formulario);
    // this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    //   .subscribe(dados => {
    //     console.log(dados);
    //     // Resetar o formulario
    //     this.resetar();
    //   },
    //   (error:any) => alert('erro'));
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  verificaValidTouched(campo: string) {
    return this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
    // return !campo.valid && campo.touched
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value;
    //Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm();

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => {
            if(!("erro" in dados)){
              this.popularDadosForm(dados);
            }else {
              //CEP pesquisado não foi encontrado.
              this.resetaDadosForm();
              alert("CEP não encontrado.");
            }
          });
      }else {
        //cep é inválido.
        this.resetaDadosForm();
        alert('formato de CEP inválido.');
      }
    } else {
      //cep é inválido.
      this.resetaDadosForm();
    }
  }

  popularDadosForm(dados: object){
    this.formulario.patchValue({
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

  resetaDadosForm(){
    this.formulario.patchValue({
        endereco: {
            rua: null,
            complemento: null,
            bairro: null,
            cidade: null,
            estado: null
        }
    });
  }
  
}
