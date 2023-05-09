import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _AuthService:AuthService ,private _Router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._AuthService.userType.getValue() == "null")
      {
        return true;
      }
      else if (this._AuthService.userType.getValue() == "doctor")
      {
        this._Router.navigate(['doctor/addslot'])
        return false;
      }
      else
      {
        this._Router.navigate(['patient'])
        return false;
      }
      //return true
  }
  
}
