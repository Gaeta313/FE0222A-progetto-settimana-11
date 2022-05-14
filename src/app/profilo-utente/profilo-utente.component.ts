import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utente } from '../interfaces/utente';
import { UserSrvService } from '../services/user-srv.service';

@Component({
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.scss']
})
export class ProfiloUtenteComponent implements OnInit {
  utenteLog!:Utente | undefined;  // qui appoggio l'utente che ha effettuato il login se ne esiste uno
  subUtente!:Subscription;    // sottoscrizione alla getUtenteLog()
  subPut!:Subscription;      // sottoscrizione alla put dell'utente modificato
  modifica:boolean = false;   // flag utilizzato per modificare l'indirizzo dell'utente
  constructor(private userSrv:UserSrvService) { }

  // ottengo l'utente che ha effettuato il login, tramite subject rendo disponibili i dati alla navbar
  ngOnInit(): void {
    this.subUtente = this.userSrv.getUtenteLog().subscribe(val => {
      this.utenteLog = val[0];
      this.userSrv.utenteLog.next(this.utenteLog);
    })
  }

  // cocludo la modifica dell'indirizzo dell'utente e tramite una put aggiorno i dati dell'utente in dbUser.json
  completaModifica(){
    this.modifica = !this.modifica;
    this.subPut = this.userSrv.putUtente(this.utenteLog?.id!,this.utenteLog!).subscribe(val=>{
      console.log('utente modificato con successo',val);
    })
  }

  ngonDestroy() {
    this.subPut.unsubscribe();
    this.subUtente.unsubscribe();
  }

}
