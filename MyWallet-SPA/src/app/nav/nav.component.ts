import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn(){
    console.log(this.authService.decodedToken)
    return this.authService.loggedIn();
  }

  logout(){
    sessionStorage.clear();
    this.alertify.success("Logged out!");
    this.router.navigate(["/"]);
  }

}
