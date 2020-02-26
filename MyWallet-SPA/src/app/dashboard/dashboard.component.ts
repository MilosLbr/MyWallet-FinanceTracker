import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BankAccount } from '../_models/bankAccount';
import { Transaction } from '../_models/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bankAccounts : BankAccount[] = [{accountName : "adad", id : 1, ballance : 456, userId: 2},{accountName : "adad", id : 1, ballance : 456, userId: 2},{accountName : "adad", id : 1, ballance : 456, userId: 2}, {accountName : "adad", id : 1, ballance : 456, userId: 2}];
  transactions: Transaction[];
  showAccountDetails: boolean = false;


  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  showTransactionsForAccount(){
    this.showAccountDetails = !this.showAccountDetails;
  }

}
