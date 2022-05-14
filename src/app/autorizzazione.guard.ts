import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorizzazioneGuard implements CanActivate {
  guard!:string|null
  constructor(private router:Router){}

  // sono consapevole che anche un bambino sarebbe in grado di haccherare questa guardia...ma vedendo il local storage, lo sa anche la guardia
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   this.guard = localStorage.getItem('AmaSonGuard');
   if(this.guard){
     return true;
   }
   else{
    this.router.navigate(['/login'])
    return false;
   }
  }

}
