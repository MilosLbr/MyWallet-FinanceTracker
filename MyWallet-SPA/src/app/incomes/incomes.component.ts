import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { IncomeCategory } from '../_models/incomeCategory';
import { BankAccount } from '../_models/bankAccount';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {

  constructor() {     
  }

  ngOnInit() {    
  }


}
