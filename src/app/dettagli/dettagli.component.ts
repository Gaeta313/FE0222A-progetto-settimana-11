import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Prodotto } from '../interfaces/prodotto';
import { Utente } from '../interfaces/utente';
import { ProductSrvService } from '../services/product-srv.service';
import { UserSrvService } from '../services/user-srv.service';

@Component({
  templateUrl: './dettagli.component.html',
  styleUrls: ['./dettagli.component.scss']
})
export class DettagliComponent implements OnInit {
  subroute!:Subscription;  // sottoscrizione all' ActivatedRoute per ottenere i parametri
  sub!:Subscription        // sottoscrizione all get prodotto by id
  subUtente!:Subscription; //sottoscrizione all' get utente che ha effetuato il login se esiste
  utenteLog!:Utente| undefined; // qui appoggio l'utente che ha effettuato il login
  prodotto!:Prodotto;  // qui appoggio il prodotto ottenuto tramite get prodotto by id
  id!:number    // l'id ottenuto tramite params
  flag:boolean = false // mostra/nasconde i messaggi nel template legati alla possibilità di poter acquistare
  successo:boolean = false;


  constructor(private productSrv:ProductSrvService, private router:ActivatedRoute, private userSrv:UserSrvService) { }

  // ottengo l'elenco di utenti
  ngOnInit(): void {
    this.subUtente = this.userSrv.getUtenteLog().subscribe(val=>{
      this.utenteLog = val[0];
      this.userSrv.utenteLog.next(this.utenteLog);
    })

    // ottengo il paramentro id tramite router
    this.subroute = this.router.params.subscribe(params=>{
      this.id = +params['id'];
      this.flag = true;
      })

      // ottengo i dettagli del prodotto in questione tramite l'id ottenuto nella funzione precedente
      this.sub = this.productSrv.getProdottiById(this.id).subscribe(val=>{
        console.log(val)
        this.prodotto = val;
        this.sub.unsubscribe();
    })
  }

  // tramite service, il prodotto visualizzato viene aggiunto al carrello personale dell'utente loggato
  aggiungi(prodotto:Prodotto){
    this.successoTime();
    this.utenteLog?.carrello.push(prodotto);
    this.userSrv.putUtente(this.utenteLog?.id!, this.utenteLog!).subscribe(val=>{
      console.log('utente aggiornato', val)
    })
  }
//mostra nasconde il messaggio di aggiunta al carrello
  successoTime(){
    this.successo= true;
    setTimeout(()=>{
      this.successo= false;
    },3000)
  }

  ngonDestroy() {
    this.sub.unsubscribe();
    this.subUtente.unsubscribe();
    this.subroute.unsubscribe();
  }
}
