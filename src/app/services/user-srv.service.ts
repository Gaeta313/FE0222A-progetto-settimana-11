import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ordine } from '../interfaces/ordine';
import { Utente } from '../interfaces/utente';

@Injectable({
  providedIn: 'root'
})
export class UserSrvService {
  //Oggetto utente vuoto usato alla creazione di un nuovo utente
  nuovoUtente: Utente = {
    id: undefined,
    username:"",
    password:"",
    login:false,
    indirizzo:"",
    urlImmagine:"../../assets/img/fotoProfilo.jpg",
    carrello:[]
  }
 // flag = new Subject<boolean>()
  utenteLog = new Subject<Utente|undefined>() // utilizzato per passare alla navbar i dati dell'utente loggato
  constructor(private http: HttpClient) {
  }

  getUtenti(){
    return this.http.get<Utente[]>('http://localhost:4202/users');
  }

  //pubblicazione di un nuovo utente nel dbUser.Json
  postUtenti(utente:Utente){
    this.nuovoUtente.username = utente.username;
    this.nuovoUtente.password = utente.password;
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(this.nuovoUtente);
    return this.http.post<Utente>('http://localhost:4202/users', body,{headers: headers} );
  }

  // pubblicazione di un nuovo ordine nel dbUser.Json
  postOrdini(ordine:Ordine){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(ordine);
    return this.http.post<Ordine>('http://localhost:4202/orders', body,{headers: headers} );
  }

  //restituisce ordini filtrati in base all'id dell'utente
  getOrdiniByIdUtente(id:number){
    return this.http.get<Ordine[]>('http://localhost:4202/orders?idUtente='+id);
  }

  //restituisce l'utente che ha effettuato il login
  getUtenteLog(){
    return this.http.get<Utente[]>('http://localhost:4202/users?login=true');
  }

  //modifica un utente che gli viene passato come parametro nel dbUser.Json
  putUtente(id:number,utente:Utente){
    const body=JSON.stringify(utente);
    const headers = { 'content-type': 'application/json'}
    return this.http.put<Utente[]>('http://localhost:4202/users/' + id,body,{headers: headers});
  }


}
