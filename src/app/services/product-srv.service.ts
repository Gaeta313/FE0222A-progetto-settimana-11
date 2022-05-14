import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from '../interfaces/prodotto';

@Injectable({
  providedIn: 'root'
})
export class ProductSrvService {




  constructor(private http:HttpClient) {

  }
  //restituisce tutti i prodotti
  getProdotti(){
    return this.http.get<Prodotto[]>('http://localhost:4201/products');
  }

  //restituisce i dettagli del singolo prodotto richiesto
  getProdottiById(id:number){
    return this.http.get<Prodotto>('http://localhost:4201/products/'+id);
  }

}
