import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utente } from '../interfaces/utente';
import { UserSrvService } from '../services/user-srv.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  sub!: Subscription;         // sottoscrizione alla subject citata nel commento sottosttante
  utenteLog!: Utente | undefined;  // riceve tramite subject i dati dell'utente che ha effettuato il login nel caso ci sia

  constructor(private userSrv: UserSrvService ,private router: Router) {}

  //ottiene i dati dell'utente che ha effetuato il login nel caso ci sia
  ngOnInit(): void {
    this.sub = this.userSrv.utenteLog.subscribe((val) => {
      this.utenteLog = val;
      console.log(val)
    });
  }

  // imposta lo stato di login dell'utente su false e lo aggiorna tramite service su dbUser.json, adesso non ci saranno utenti loggati fino al prossimo login
  logout() {
    if (this.utenteLog) {
      this.utenteLog.login = false;
      this.userSrv.putUtente(this.utenteLog.id!, this.utenteLog).subscribe((val) => {
          this.userSrv.utenteLog.next(undefined);
          localStorage.removeItem('AmaSonGuard');
          this.router.navigate(['/'])
        });
    }
  }
  ngonDestroy(){
    this.sub.unsubscribe();
  }
}
