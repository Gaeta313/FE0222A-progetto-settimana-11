import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ordine } from '../interfaces/ordine';
import { Utente } from '../interfaces/utente';
import { UserSrvService } from '../services/user-srv.service';

@Component({
  templateUrl: './ordini-utente.component.html',
  styleUrls: ['./ordini-utente.component.scss']
})
export class OrdiniUtenteComponent implements OnInit {
  utenteLog!:Utente | undefined;     // qui appoggio l'utente che ha effettuato il login se ne esiste uno
  ordini!:Ordine[];           // appoggio gli ordini filtrati dal sevice effettuati dall'utente loggato
  subUtente!:Subscription;    // sottoscrizione all'utente loggato
  subOrdini!:Subscription;    //sottoscrizione all'elenco ordini
  constructor(private userSrv:UserSrvService) { }

  // ottengo prima l'utente, e poi i suoi ordini
  ngOnInit(): void {
    this.subUtente = this.userSrv.getUtenteLog().subscribe(val => {
      this.utenteLog = val[0];
      this.userSrv.utenteLog.next(this.utenteLog);
      this.subOrdini = this.userSrv.getOrdiniByIdUtente(this.utenteLog?.id!).subscribe(val=>{
      this.ordini = val;
      console.log(this.ordini);
    });
    })
  }

  ngonDestroy() {
    this.subOrdini.unsubscribe();
    this.subUtente.unsubscribe();
  }

}
