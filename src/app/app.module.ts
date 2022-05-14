import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule,Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { DettagliComponent } from './dettagli/dettagli.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { OrdiniUtenteComponent } from './ordini-utente/ordini-utente.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AutorizzazioneGuard } from './autorizzazione.guard';



const routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrati',
    component: RegistratiComponent
  },
  {
    path: '',
    component: ProdottiComponent
  },
  {
    path:'prodotti/:id',
    component: DettagliComponent
  },
  {
    path:'carrello',
    canActivate:[AutorizzazioneGuard],
    component: CarrelloComponent
  },
  {
    path:'profilo',
    canActivate:[AutorizzazioneGuard],
    component: ProfiloUtenteComponent
  },
  {
    path:'ordini',
    canActivate:[AutorizzazioneGuard],
    component: OrdiniUtenteComponent
  }


];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistratiComponent,
    ProdottiComponent,
    DettagliComponent,
    CarrelloComponent,
    ProfiloUtenteComponent,
    OrdiniUtenteComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
