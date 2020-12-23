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
  
}
