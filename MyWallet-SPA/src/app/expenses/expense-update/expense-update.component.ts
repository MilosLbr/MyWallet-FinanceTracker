import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import {  BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseCategory } from 'src/app/_models/expenseCategory';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.css']
})
export class ExpenseUpdateComponent implements OnInit {
  @ViewChild("editExpenseForm", {static: false}) editExpenseForm: NgForm;

  expenseCategoryId: number;
  dateAdded: Date;
  ammount: number;
  comment: string;
  expenseId: number;
  allExpenseCategories: ExpenseCategory[];


  constructor(private modalRef: BsModalRef,private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  submitEditForm(){
    console.log(this.editExpenseForm.form.value, ' gg ' , this.dateAdded)
    if(this.editExpenseForm.valid){
      const expenseUpdateDto = this.editExpenseForm.value;
      expenseUpdateDto.id = this.expenseId;
      expenseUpdateDto.dateAdded = expenseUpdateDto.dateAdded.toDateString();

      this.userService.updateExpenseRecord(this.authService.decodedToken.nameid, expenseUpdateDto).subscribe(()=> {
        this.alertify.success("Updated!");
        this.modalRef.hide();
      }, error=> {
        this.alertify.error("An error happened while updating expense record!");
      });
    }
  }

}
