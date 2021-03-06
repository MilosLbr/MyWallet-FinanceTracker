import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AccountsAndCategories } from '../_models/accountsAndCategories';
import { Income } from '../_models/income';
import { BankAccountCreate } from '../_models/bankAccountCreate';
import { Expense } from '../_models/expense';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBankAccountListForUser(userId:number){
    return this.http.get(this.baseUrl + "users/" + userId + "/bankAccounts");
  }

  getBankAccountsAndCategories(userId:number) : Observable<AccountsAndCategories>{
    return this.http.get<AccountsAndCategories>(this.baseUrl + "users/" + userId + "/bankAccounts/accountsAndCategories");
  }

  getTransactionsOnBankAccount(userId: number, bankAccountId: number){
    return this.http.get(this.baseUrl +"account/" + userId + "/getUsersTransactions/"+ bankAccountId);
  }

  postNewIncomeRecord(income: Income, userId: number){
    return this.http.post(this.baseUrl + "users/"+ userId +"/incomes", income);
  }

  getIncomeRecordsForUser(userId: number){
    return this.http.get(this.baseUrl + "users/"+ userId +"/incomes");
  }

  deleteIncomeRecord(userId: number, incomeRecordId: number){
    return this.http.delete(this.baseUrl + "users/"+ userId + "/incomes/" + incomeRecordId);
  }

  createBankAccount(userId: number, bankAccount: BankAccountCreate){
    return this.http.post(this.baseUrl + "users/" + userId + "/bankAccounts", bankAccount)
  }

  updateBankAccountName(userId: number, bankAccount: any){
    return this.http.put(this.baseUrl+ "users/" + userId + "/bankAccounts", bankAccount);
  }

  deleteBankAccount(userId: number, bankAccountId: number){
    return this.http.delete(this.baseUrl + "users/" + userId + "/bankAccounts/" + bankAccountId);
  }

  updateIncomeRecord(userId: number, income: any){
    return this.http.put(this.baseUrl + "users/"+ userId + "/incomes", income);
  }

  getExpenseRecordsForUser(userId: number){
    return this.http.get(this.baseUrl + "users/"+ userId +"/expenses");
  }

  postNewExpenseRecord(userId: number, expense: Expense){
    return this.http.post(this.baseUrl + "users/"+ userId +"/expenses" , expense);
  }

  deleteExpenseRecord(userId: number, expenseId: number){
    return this.http.delete(this.baseUrl + "users/"+ userId +"/expenses/" + expenseId);
  }

  updateExpenseRecord(userId: number, expense: any){
    return this.http.put(this.baseUrl + "users/"+ userId +"/expenses", expense);
  }

}
