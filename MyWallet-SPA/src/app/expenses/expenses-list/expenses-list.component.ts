import { Component, OnInit, Input } from '@angular/core';
import { Expense } from 'src/app/_models/expense';
import { AuthService } from 'src/app/_services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { ExpenseCategory } from 'src/app/_models/expenseCategory';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {
  @Input() listOfExpenses: Expense[];
  modalRef: BsModalRef;
  expenseRecordIdForDelete: number;
  expenseCategories: ExpenseCategory[];

  constructor(private authService: AuthService, private modalService: BsModalService, private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data ) => {
      this.expenseCategories = data.accountsAndCategories.expenseCategories;
   }); 
  }

  openEditExpenseModal(expense: Expense){
    const initialState = {
      expenseCategoryId: expense.expenseCategory.id,
      ammount: expense.ammount,
      comment: expense.comment,
      expenseId: expense.id,
      allExpenseCategories: this.expenseCategories
    };

    this.modalRef = this.modalService.show(ExpenseUpdateComponent, {initialState});

    this.modalService.onHide.subscribe(() => {
      this.userService.getExpenseRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Expense[]) => {
        this.listOfExpenses = data;
      }, error => {
        this.alertify.error("An error happened while retrivieng list of expense records!")
      })
    })
  }

}
