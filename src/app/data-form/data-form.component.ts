import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  // estados: any = [];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
    // this.dropDownService.getEstadosBr().subscribe(dados =>  this.estados = dados);

    this.estados = this.dropDownService.getEstadosBr();

    this.cargos = this.dropDownService.getCargos();

    this.tecnologias = this.dropDownService.getTecnologias();

    this.newsletterOp = this.dropDownService.getNewsletter();

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
      }),

      cargo: [null],
      tecnologia: [null],
      newsletter: ['s']
    });

  }

  onSubmit() {
    console.log(this.formulario);
    if (this.formulario.valid) {
       // this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      //   .subscribe(dados => {
      //     console.log(dados);
      //     // Resetar o formulario
      //     this.resetar();
      //   },
      //   (error:any) => alert('erro'));
    } else {
      this.verifcaValidacoesForm(this.formulario);
    }
  }

  verifcaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle?.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verifcaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  verificaValidTouched(campo: string) {
    return (
      this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
    // return !campo.valid && campo.touched
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.subscribe(dados => {
        if (!('erro' in dados)){
          this.popularDadosForm(dados);
        }else {
          // CEP pesquisado não foi encontrado.
          this.resetaDadosForm();
          alert('CEP não encontrado.');
        }
      });
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

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologia')?.setValue(['java', 'php']);
  }
}
