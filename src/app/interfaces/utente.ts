import { Prodotto } from "./prodotto";

export interface Utente {
  id:number|undefined;
  username:string;
  password:string;
  login:boolean;
  indirizzo:string;
  urlImmagine:string;
  carrello:Prodotto[]
}
