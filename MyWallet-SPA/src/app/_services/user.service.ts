import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBankAccountListForUser(userId:number){
    return this.http.get(this.baseUrl + "users/" + userId + "/bankAccounts");
  }

  getTransactionsOnBankAccount(userId: number, bankAccountId: number){
    return this.http.get(this.baseUrl +"account/" + userId + "/getUsersTransactions/"+ bankAccountId);
  }

}
