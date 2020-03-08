import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { TransactionGroup } from 'src/app/_models/transactionGroup';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  @Input() transactions: TransactionGroup[];
  @Input() selectedBankAccountId: number;
  @Output() emmitConfirmedDeletion: EventEmitter<boolean> = new EventEmitter();
  modalRef: BsModalRef;
  
  constructor(private modalService: BsModalService, private authService: AuthService,private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  deleteSelectedBankAccount(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);    
  }

  confirm(){
    this.userService.deleteBankAccount(this.authService.decodedToken.nameid, this.selectedBankAccountId).subscribe(() => {
      this.alertify.success("Deleted account!")      
      this.modalRef.hide();    
      this.emmitConfirmedDeletion.emit(true);
      this.transactions = [];
    }, error => {
      this.alertify.error("An error happened while deleting bank account with id: " + this.selectedBankAccountId);
    })
  }

  decline(){
    this.modalRef.hide();
  }

}
