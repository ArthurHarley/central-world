import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private http = inject(HttpClient);

  pesquisarPais(nome: string) {
    return this.http.get<any[]>(
      `https://restcountries.com/v3.1/name/${nome}`
    );
  }
}