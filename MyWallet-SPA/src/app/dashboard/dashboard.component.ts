import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BankAccount } from '../_models/bankAccount';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../_services/user.service';
import { TransactionGroup } from '../_models/transactionGroup';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';

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

  constructor(public authService: AuthService, private userService: UserService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllBankAccounts();
  }

  getAllBankAccounts() {
    this.userService.getBankAccountListForUser(this.authService.decodedToken.nameid).subscribe((data: BankAccount[]) => {
      this.bankAccounts = data;
    })
  }

  showTransactionsForAccount(bankAccountId: number){
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

}
