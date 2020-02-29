import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AccountsAndCategories } from '../_models/accountsAndCategories';

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

}
