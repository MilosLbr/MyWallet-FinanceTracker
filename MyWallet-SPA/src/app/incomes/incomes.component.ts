import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { IncomeCategory } from '../_models/incomeCategory';
import { BankAccount } from '../_models/bankAccount';
import { AccountsAndCategories } from '../_models/accountsAndCategories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  @ViewChild("incomeForm", {static: false}) incomeForm: NgForm;
  bankAccounts : BankAccount[];
  incomeCategories: IncomeCategory[];
  selectedAccountId = null;
  selectedCategoryId = null;

  constructor(
    private route: ActivatedRoute ) {     
  }

  ngOnInit() {      
    this.route.data.subscribe((data ) => {
      console.log(data, ' recieved')
      this.bankAccounts  = data.accountsAndCategories.bankAccounts;
      this.incomeCategories = data.accountsAndCategories.incomeCategories;

      console.log(this.bankAccounts, this.incomeCategories, ' asigned')
      this.selectedAccountId = this.bankAccounts[0].id;
      this.selectedCategoryId = this.incomeCategories[0].id;
    });
  }

  submitIncome(){
    console.log(this.incomeForm.form)
  }

}
