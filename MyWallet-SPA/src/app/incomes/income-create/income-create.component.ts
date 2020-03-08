import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { BankAccount } from 'src/app/_models/bankAccount';
import { IncomeCategory } from 'src/app/_models/incomeCategory';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Income } from 'src/app/_models/income';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.component.html',
  styleUrls: ['./income-create.component.css']
})
export class IncomeCreateComponent implements OnInit {
  @ViewChild("incomeForm", {static: false}) incomeForm: NgForm;
  @Output() outputToParent = new EventEmitter<boolean>();
  bankAccounts : BankAccount[];
  incomeCategories: IncomeCategory[];
  dateAdded: Date = new Date();
  selectedAccountId: number = null;
  selectedCategoryId: number = null;
  ammount: number;
  comment: string = null;

  constructor(
    private route: ActivatedRoute , private userService: UserService, private authService: AuthService, private alertify:AlertifyService) {     
  }

  ngOnInit() {      
    this.route.data.subscribe((data ) => {
      this.bankAccounts  = data.accountsAndCategories.bankAccounts;
      this.incomeCategories = data.accountsAndCategories.incomeCategories;

      this.selectedAccountId = this.bankAccounts[0].id;
      this.selectedCategoryId = this.incomeCategories[0].id;
    });
  }
  
  submitIncome(){    
    const formValue = this.incomeForm.form.value;

    if(this.incomeForm.form.valid ){
      this.userService.postNewIncomeRecord(formValue, this.authService.decodedToken.nameid).subscribe(() =>{
        this.incomeForm.reset(
          {
            bankAccountId : this.bankAccounts[0].id,
            incomeCategoryId : this.incomeCategories[0].id,
            dateAdded : new Date()
          }
         );

        this.alertify.success("Successfully posted!");
        this.outputToParent.emit(true);
      }, error => {
        this.alertify.error("An error happened while posting new income!");
      })
    }    
  }

}
