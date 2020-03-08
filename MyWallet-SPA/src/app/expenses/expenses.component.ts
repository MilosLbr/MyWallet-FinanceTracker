import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Expense } from '../_models/expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  listOfExpenses: Expense[];

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getListOfExpenses();
  }


  getListOfExpenses(){
    this.userService.getExpenseRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Expense[]) => {
      this.listOfExpenses = data;
    }, error => {
      this.alertify.error("An error happened while retrieving expense records for user!")
    })
  }
}
