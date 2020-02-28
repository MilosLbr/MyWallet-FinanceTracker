import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BankAccount } from '../_models/bankAccount';
import { Transaction } from '../_models/transaction';
import { UserService } from '../_services/user.service';
import { TransactionGroup } from '../_models/transactionGroup';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  bankAccounts : BankAccount[];
  bankAccountTransactions: TransactionGroup[];
  selectedBankAccountName: string;

  constructor(public authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getBankAccountListForUser(this.authService.decodedToken.nameid).subscribe((data: BankAccount[]) => {
      console.log(data)
      this.bankAccounts = data;
    })
  }

  showTransactionsForAccount(bankAccountId: number){
    this.selectedBankAccountName = this.bankAccounts.filter(ba => ba.id == bankAccountId)[0].accountName;

    this.userService.getTransactionsOnBankAccount(this.authService.decodedToken.nameid, bankAccountId).subscribe((data: TransactionGroup[])=>{
      console.log(data, ' bank account ' + bankAccountId + ' data');
      this.bankAccountTransactions = data;
    })
  }

}
