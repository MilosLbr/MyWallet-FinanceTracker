import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BankAccount } from '../_models/bankAccount';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../_services/user.service';
import { TransactionGroup } from '../_models/transactionGroup';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { EditAccountModalComponent } from './edit-account-modal/edit-account-modal.component';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bsModalRef: BsModalRef;
  bankAccounts : BankAccount[];
  bankAccountTransactions: TransactionGroup[];
  selectedBankAccountName: string;
  selectedBankAccountId: number;

  constructor(public authService: AuthService, private userService: UserService, private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getAllBankAccounts();
  }

  getAllBankAccounts() {
    this.userService.getBankAccountListForUser(this.authService.decodedToken.nameid).subscribe((data: BankAccount[]) => {
      this.bankAccounts = data;
    }, error => {
      this.alertify.error("An error happened while retrieving bank accounts!");
    })
  }

  showTransactionsForAccount(bankAccountId: number){
    this.selectedBankAccountId = bankAccountId;
    this.selectedBankAccountName = this.bankAccounts.filter(ba => ba.id == bankAccountId)[0].accountName;

    this.userService.getTransactionsOnBankAccount(this.authService.decodedToken.nameid, bankAccountId).subscribe((data: TransactionGroup[])=>{
      this.bankAccountTransactions = data;
    })
  }

  openCreateAccountModal(){
    this.bsModalRef = this.modalService.show(CreateAccountModalComponent);
    this.modalService.onHide.subscribe(() => {
      this.getAllBankAccounts();      
    });
  }

  openEditAccountsModal(event, accountId, accountName){
    event.stopPropagation();   
    const initialState = {
      accountId,
      accountName
    }

    this.bsModalRef = this.modalService.show(EditAccountModalComponent, {initialState});
    this.modalService.onHide.subscribe(() => {
      this.getAllBankAccounts();
    })
  }

  updateListAfterDeletion(shouldUpdateList: boolean){
    if(shouldUpdateList){
      this.bankAccountTransactions = null;
      this.getAllBankAccounts();
    }
  }

}
