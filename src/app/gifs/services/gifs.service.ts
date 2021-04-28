import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey :string = "hXTf40YJS6lCGgGyDy2h658uogQy6YGm" // se genero en https://developers.giphy.com/dashboard/

  private _historial:string[] = [];

  public resultados:Gif[] = []; // esto se llama desde resultados.componente.ts// Gif se toma desde el archivo gifs.interface.ts


  get historial() {
    return[...this._historial];
  }

  constructor ( private http: HttpClient){ }

  buscarGifs( query:string) {

  query = query.trim().toLocaleLowerCase();

  if ( !this._historial.includes(query)) { // valida que no se ingrese duplicado
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10) // esto limita la cantidad de inserción del historial a 10
  }

  this.http.get <SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=hXTf40YJS6lCGgGyDy2h658uogQy6YGm&q=${ query } &limit=10`)
    .subscribe( (resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
    })
    
  }

}
