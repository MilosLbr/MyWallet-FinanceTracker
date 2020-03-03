import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { BankAccountCreate } from 'src/app/_models/bankAccountCreate';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.css']
})
export class CreateAccountModalComponent implements OnInit {
  @ViewChild("createAccountForm", {static: false}) createAccountForm : NgForm;
  accountName: string;
  ballance: number = 0;

  constructor(public bsModalRef: BsModalRef, private userService: UserService, private authService: AuthService, private alertify: AlertifyService,) { }

  ngOnInit() {
  }

  submitForm(){
    const bankAccount : BankAccountCreate = this.createAccountForm.form.value;

    if(this.createAccountForm.valid){
      this.userService.createBankAccount(this.authService.decodedToken.nameid, bankAccount)
      .subscribe(()=>{
        this.alertify.success("Added new bank account!");
        this.createAccountForm.reset({
          ballance : 0
        });
      }, error => {
        this.alertify.error(error.error.message);
      });
    }
    
  }

}
