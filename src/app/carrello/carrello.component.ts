import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ordine } from '../interfaces/ordine';
import { Prodotto } from '../interfaces/prodotto';
import { Utente } from '../interfaces/utente';
import { ProductSrvService } from '../services/product-srv.service';
import { UserSrvService } from '../services/user-srv.service';

@Component({
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {
  utenteLog:Utente|undefined;   // qui appoggio l'utente che ha effettuato il login
  totale:number = 0;          // il totale del carrello viene salvato qui
  subLog!:Subscription;        // sottoscrizione all'utente loggato
  subOrd!:Subscription;   // sottoscrizione alla post dell'ordine
  subPut!:Subscription;   // sottoscriozne all put dell'utente

  newOrdine:Ordine = {        // lo scheletro del nuovo ordine
    acquisti:[],
    data:undefined,
    id:undefined,
    idUtente:0,
    indirizzo:"",
    metodoDiPagamento:"",
    totale:0
  }

  constructor(private userSrv:UserSrvService, private productSrv:ProductSrvService) { }

  // ottengo i dati dell'utente loggato
  ngOnInit(): void {
  this.subLog=  this.userSrv.getUtenteLog().subscribe(val=>{
      this.utenteLog = val[0];
      console.log('Utente recuperato nell\'carrello',this.utenteLog)
      this.userSrv.utenteLog.next(this.utenteLog);
      this.getTotale();
    })
  }

  // ri/calcolo il totale dell'ordine
  getTotale(){
    this.totale = 0;
    this.utenteLog?.carrello.forEach(prodotto=>{
      this.totale += prodotto.price;
    })
  }

  // elimino un prodotto dal carrello dell'utente e salvo le modifiche anche nel dbUser.json
  elimina(index:number){
    if(this.utenteLog){
    this.utenteLog.carrello.splice(index,1);
    console.log(this.utenteLog.carrello);
    this.userSrv.putUtente(this.utenteLog.id!, this.utenteLog).subscribe(val=>{
      console.log('Utente aggiornato',val);
      this.getTotale();
    })
    }
  }


// salvo i dati dell'ordine ottenuti dal form e lo salvo nel dbUser.json
  submit(form:any){
    console.log(form);
    this.newOrdine.acquisti = this.utenteLog?.carrello!;
    this.newOrdine.indirizzo = form.value.indirizzo;
    this.newOrdine.data = new Date();
    this.newOrdine.idUtente = this.utenteLog?.id!;
    this.newOrdine.metodoDiPagamento = form.value.pagamento;
    this.newOrdine.totale = this.totale;
    this.subOrd = this.userSrv.postOrdini(this.newOrdine).subscribe(val=>{
      console.log( 'Ordine registrato',val);
      this.utenteLog!.carrello = [];
      this.subPut = this.userSrv.putUtente(this.utenteLog!.id!, this.utenteLog!).subscribe(val=>{
        console.log('utente modificato',val);
      })
    })
    form.reset();
  }

  ngonDestroy() {
    this.subLog.unsubscribe();
    this.subOrd.unsubscribe();
    this.subPut.unsubscribe();
  }

}
