import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionGroup } from 'src/app/_models/transactionGroup';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  @Input() transactions: TransactionGroup[];
  constructor() { }

  ngOnInit() {
  }

}
