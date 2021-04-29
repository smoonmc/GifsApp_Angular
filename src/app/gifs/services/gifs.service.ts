import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif, Images } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey :string = "hXTf40YJS6lCGgGyDy2h658uogQy6YGm" // se genero en https://developers.giphy.com/dashboard/

  private servicioUrl:string = "https://api.giphy.com/v1/gifs";

  private _historial:string[] = [];

  public resultados:Gif[] = []; // esto se llama desde resultados.componente.ts// Gif se toma desde el archivo gifs.interface.ts


  get historial() {
    return[...this._historial];
  }

  constructor ( private http: HttpClient){ 
       
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];

    this.resultados = JSON.parse(localStorage.getItem("imagenes")!)  || [];

  }

  buscarGifs( query:string) {

  query = query.trim().toLocaleLowerCase();

  if ( !this._historial.includes(query)) { // valida que no se ingrese duplicado
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10) // esto limita la cantidad de inserción del historial a 10
  
    localStorage.setItem("historial", JSON.stringify (this._historial) );//Almacena historial de busqueda en el localStorage
   
  
  }

  const params = new HttpParams()
                .set("api_key", this.apiKey)
                .set("limit", "10")
                .set("q", query);

  this.http.get <SearchGifsResponse>(`${this.servicioUrl}/search?`, {params})
    .subscribe( (resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem("imagenes", JSON.stringify (this.resultados) );//Almacena historial de imagenes en el localStorage
    })
    
  }

}
