import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Utente } from '../interfaces/utente';
import { UserSrvService } from '../services/user-srv.service';

@Component({
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.scss']
})
export class RegistratiComponent implements OnInit {
  @ViewChild('f', { static: true }) form!: NgForm
  user!:Utente;   // l'utente che si registra viene appoggiato qui
  subCreate!:Subscription   // sottoscrive il post
  subGet!:Subscription;  // sottoscrive il get
  subStatus!:Subscription|undefined;  // sottoscrive lo status change del form
  users:Utente[] = [];  // il risultato della get utenti viene passato qui
  invalidName:Boolean = false  // utilizzata per vedere se il nome utente esite già in dbUser.json
  successo:boolean = false;   // visualizza nasconde l'alert verde di conferma registrazione
  constructor(private userSrv:UserSrvService) { }

  ngOnInit(): void {
   this.getUtenti();
  }

  // ottengo tutti gli utenti registrati
  getUtenti(){
    this.subStatus?.unsubscribe();
    this.subGet = this.userSrv.getUtenti().subscribe(utenti=>{
      this.users = utenti;
      this.controllo();
    })
  }

  // verifico se il nome utente inserito nel form è già usato in dbUser.json
  controllo(){
   this.subStatus= this.form.statusChanges?.subscribe(status => {
      if(this.users.find(utente=>utente.username == this.form.value.username)){
        this.invalidName = true
      }
      else{
        this.invalidName = false;
      }
			console.log('Stato del form: ', this.invalidName);
		})
  }

  // mostra temporaneamente l'alert verde di successo nella registrazione
  successoTime(){
    this.successo= true;
    setTimeout(()=>{
      this.successo= false;
    },3000)
  }

  // pubblicazione del nuovo utente creato tramite form all'interno di dbUser.json
  submit(){
    this.user = this.form.value;
    this.subCreate = this.userSrv.postUtenti(this.user).subscribe(val=>{
      this.successoTime();
      this.getUtenti();
    });
    this.form.reset();
  }

  ngonDestroy() {
    this.subCreate.unsubscribe();
    this.subGet.unsubscribe();
    this.subStatus?.unsubscribe();
  }
}
