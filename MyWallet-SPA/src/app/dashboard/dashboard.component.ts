import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BankAccount } from '../_models/bankAccount';
import { Transaction } from '../_models/transaction';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //bankAccounts : BankAccount[] = [{accountName : "adad", id : 1, ballance : 456, userId: 2},{accountName : "adad", id : 1, ballance : 456, userId: 2},{accountName : "adad", id : 1, ballance : 456, userId: 2}, {accountName : "adad", id : 1, ballance : 456, userId: 2}];
  bankAccounts : BankAccount[];
  bankAccountTransactions: Transaction[];
  showAccountDetails: boolean = false;


  constructor(public authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getBankAccountListForUser(this.authService.decodedToken.nameid).subscribe((data: BankAccount[]) => {
      console.log(data)
      this.bankAccounts = data;
    })
  }

  showTransactionsForAccount(bankAccountId: number){
    this.showAccountDetails = !this.showAccountDetails;
    console.log(bankAccountId, " id of bank account");

    this.userService.getTransactionsOnBankAccount(this.authService.decodedToken.nameid, bankAccountId).subscribe((data: Transaction[])=>{
      console.log(data, ' bank account ' + bankAccountId + ' data');
      this.bankAccountTransactions = data;
    })
  }

}
