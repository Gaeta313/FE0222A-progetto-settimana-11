import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Prodotto } from '../interfaces/prodotto';
import { Utente } from '../interfaces/utente';
import { ProductSrvService } from '../services/product-srv.service';
import { UserSrvService } from '../services/user-srv.service';

@Component({
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent implements OnInit {
  utenteLog!:Utente|undefined;    // qui appoggio l'utente che ha effettuato il login se ne esiste uno
  prodotti!:Prodotto[];         // qui appoggio tutto l'elenco prodotti
  subLog!:Subscription;         // sottoscrizione all'utente loggato
  subProdotti!:Subscription;    //sottoscrizione all'elenco dei prodotti
  constructor(private usersSrv:UserSrvService, private productSrv:ProductSrvService) { }

  // // ottengo l'utente che ha effettuato il login, tramite subject rendo disponibili i dati alla navbar
  ngOnInit(): void {
     this.subLog = this.usersSrv.getUtenteLog().subscribe(val=>{
      this.utenteLog = val[0];
     this.usersSrv.utenteLog.next(this.utenteLog);
    })

    // ottengo i prodotti
    this.subProdotti = this.productSrv.getProdotti().subscribe(val=>{
      this.prodotti = val;
      console.log(this.prodotti);
    })

  }

  ngonDestroy() {
    this.subProdotti.unsubscribe();
    this.subLog.unsubscribe();
  }


}
