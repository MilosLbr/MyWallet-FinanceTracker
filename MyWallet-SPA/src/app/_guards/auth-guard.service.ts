import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) :  boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(["/"]);
      this.alertify.error("You need to be logged in!");
    }
  }

}
