import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm", {static: false}) loginForm: NgForm;
  testerLoginData = {
    username: 'tester',
    password: 'password'
  }

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(){
    if(this.loginForm.valid){
      const {username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(() => {
        this.alertify.success("Logged in successfully!");
        this.loginForm.reset();
        this.router.navigate(["/dashboard"])
      }, error => {
        this.alertify.error(error.error.error_description)
      });
    }
  }

  loginAsTester(event){
    event.target.disabled = true;
    
    this.authService.login(this.testerLoginData.username, this.testerLoginData.password).subscribe(() => {
      this.alertify.success("Logged in successfully!");
      this.loginForm.reset();
      this.router.navigate(["/dashboard"]);
      event.target.disabled = false;
    }, error => {
      this.alertify.error(error.error.error_description)
    });
  }

}
