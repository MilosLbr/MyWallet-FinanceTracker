import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild("registerForm", {static: false}) registerForm: NgForm; 

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() { 
  }

  submitForm(){
    const {username, email, password } = this.registerForm.value;

    if(this.registerForm.valid){
      this.authService.registerUser(username, email, password).subscribe(() => {     
        this.alertify.success("Successfuly registered!");
        this.registerForm.reset();        
      }, error=>{
        this.alertify.error(error.error.message);
      }, () => {
        this.authService.login(username, password).subscribe(()=> {
          this.router.navigate(["/dashboard"])
        })
      });
    }

    
  }

}
