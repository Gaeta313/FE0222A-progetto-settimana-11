import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Utente } from '../interfaces/utente';
import { UserSrvService } from '../services/user-srv.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: true }) form!: NgForm
  successo:boolean = false;    // flag utilizzato per mostrae/nascondere il messaggio di avvenuto login
  errore:boolean = false;  // flag per mostrare/nascondere il messaggio di errore nella procedura di login
  utentelog!:Utente|undefined;  // qui viene appoggiato l'utente per la modifica(put) nel dbUser.jason
  subGet!:Subscription;  // sottoscrizione alla get utention
  users!:Utente[];    // qui vengono appoggiati tutti gli utenti

  constructor(private userSrv: UserSrvService, private router:Router) { }

  // ottengo l'elenco di utenti
  ngOnInit(): void {
    this.subGet =this.userSrv.getUtenti().subscribe(val=>{
      this.users = val;
    })
  }

  //se trova una corrispondenza username/password modifica(put) l'utente nel dbUser.json con login a true,adesso ogni component riceverà l'utente in questione
  submit(){
    this.utentelog = this.users.find(utente=>utente.username == this.form.value.username && utente.password == this.form.value.password)
    if(this.utentelog){
      this.successoTime();
      this.utentelog.login= true;
      this.userSrv.utenteLog.next(this.utentelog);
      this.userSrv.putUtente(this.utentelog.id!, this.utentelog).subscribe(val=>{
        this.router.navigate(['/'])
      });
    }
    else{
      this.erroreTime();
    }
    this.form.reset();
  }

  // mostra temporaneamente l'alert di successo
  successoTime(){
    this.successo= true;
    setTimeout(()=>{
      this.successo= false;
    },3000)
  }

 // mostra temporaneamente l'alert di errore
  erroreTime(){
    this.errore= true;
    setTimeout(()=>{
      this.errore= false;
    },3000)
  }


  ngonDestroy(){
    this.subGet.unsubscribe();
  }
}
