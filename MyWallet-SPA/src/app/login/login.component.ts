import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm", {static: false}) loginForm: NgForm;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  submitForm(){
    if(this.loginForm.valid){
      const {username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(() => {
        this.alertify.success("Logged in successfully!");
      }, error => {
        this.alertify.error(error.error.error_description)
      })
    }
  }

}
