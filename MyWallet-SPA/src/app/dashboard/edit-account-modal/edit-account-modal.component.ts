import { Component, OnInit, ViewChild} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.component.html',
  styleUrls: ['./edit-account-modal.component.css']
})
export class EditAccountModalComponent implements OnInit {
  @ViewChild("editNameForm", {static: false}) editNameForm : NgForm;
  accountName: string;
  accountId: number;


  constructor(public bsModalRef: BsModalRef, private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  submitEdit(){
    if(this.editNameForm.valid){
      
      const bankAccount = {
        id: this.accountId,
        accountName: this.accountName
      }
      
      this.userService.updateBankAccountName(this.authService.decodedToken.nameid, bankAccount).subscribe(() => {
        this.alertify.success("Updated!");
        this.bsModalRef.hide();
      }, error => {
        this.alertify.error(error.error.message);
      })
    }
  }

}
