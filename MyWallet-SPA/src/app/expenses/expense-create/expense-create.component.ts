import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { BankAccount } from 'src/app/_models/bankAccount';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ExpenseCategory } from 'src/app/_models/expenseCategory';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css']
})
export class ExpenseCreateComponent implements OnInit {
  @ViewChild("expenseForm", {static: false}) expenseForm: NgForm;
  @Output() outputToParent = new EventEmitter<boolean>();
  bankAccounts : BankAccount[];
  expenseCategories: ExpenseCategory[];
  dateAdded: Date = new Date();
  selectedAccountId: number = null;
  selectedCategoryId: number = null;
  ammount: number;
  comment: string = null;

  constructor(
    private route: ActivatedRoute , private userService: UserService, private authService: AuthService, private alertify:AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe((data ) => {
      this.bankAccounts  = data.accountsAndCategories.bankAccounts;
      this.expenseCategories = data.accountsAndCategories.expenseCategories;

      this.selectedAccountId = this.bankAccounts[0].id;
      this.selectedCategoryId = this.expenseCategories[0].id;
    });
  }

  submitExpense(){
    const formValue = this.expenseForm.form.value;

    if(this.expenseForm.form.valid){
      this.userService.postNewExpenseRecord(this.authService.decodedToken.nameid, formValue).subscribe(() => {
        this.expenseForm.reset(
          {
            bankAccountId : this.bankAccounts[0].id,
            expenseCategoryId : this.expenseCategories[0].id,
            dateAdded : new Date()
          }
        );

        this.alertify.success("Successfully posted!");
        this.outputToParent.emit(true);
      }, error => {
        this.alertify.error("An error happened while posting new expense!");
      });      
    }
  }

}
