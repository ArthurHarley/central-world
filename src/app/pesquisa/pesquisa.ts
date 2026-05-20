import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaisService } from './pais.service';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './pesquisa.html',
  styleUrl: './pesquisa.css',
})
export class Pesquisa {
  private fb = inject(FormBuilder);
  private paisService = inject(PaisService);

  formPesquisa: FormGroup;
  pais: any = null;
  pesquisado = false;
  carregando = false;

  constructor() {
    this.formPesquisa = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  pesquisar() {
    if (this.formPesquisa.invalid) {
      this.formPesquisa.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.pesquisado = false;
    this.pais = null;

    const nome = this.formPesquisa.value.nome;

    this.paisService.pesquisarPais(nome).subscribe({
      next: (res) => {
        this.carregando = false;
        this.pesquisado = true;

        if (res && res.length > 0) {
          this.pais = res[0];
        }
      },
      error: () => {
        this.carregando = false;
        this.pesquisado = true;
        this.pais = null;
      }
    });
  }

  novaPesquisa() {
    this.formPesquisa.reset();
    this.pais = null;
    this.pesquisado = false;
  }

  get moedas(): string {
    if (!this.pais?.currencies) return 'Não informado';

    return Object.values(this.pais.currencies)
      .map((moeda: any) => `${moeda.name} (${moeda.symbol || ''})`)
      .join(', ');
  }

  get idiomas(): string {
    if (!this.pais?.languages) return 'Não informado';

    return Object.values(this.pais.languages).join(', ');
  }
}