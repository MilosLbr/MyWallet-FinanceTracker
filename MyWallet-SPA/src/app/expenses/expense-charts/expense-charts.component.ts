import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Expense } from 'src/app/_models/expense';
import * as CanvasJS from '../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-expense-charts',
  templateUrl: './expense-charts.component.html',
  styleUrls: ['./expense-charts.component.css']
})
export class ExpenseChartsComponent implements OnInit {
  listOfExpenses: Expense[];
  overallSum: number;

  expenseCategories = {};
  expenseChart : CanvasJS.Chart;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {

    this.userService.getExpenseRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Expense[]) =>{
      this.listOfExpenses = data;
      this.overallSum = this.listOfExpenses.map(e => e.ammount).reduce((prev, current) => prev + current);

      this.prepareDataForChart(this.listOfExpenses);
      this.renderExpenseChart();
    }, error => {
      this.alertify.error("An error happened while retrivieng list of expense records!");  
    });
  }

  prepareDataForChart(expenses: Expense[]){
    expenses.forEach(expense => {
      if(this.expenseCategories[expense.expenseCategory.expenseCategoryName]){
        this.expenseCategories[expense.expenseCategory.expenseCategoryName] += expense.ammount;
      }else{
        this.expenseCategories[expense.expenseCategory.expenseCategoryName] = expense.ammount;
      }
    })
  }

  renderExpenseChart(){
    const categories = Object.keys(this.expenseCategories);
    const dataPoints = categories.map(category => {
      return {
        label: category,
        y: this.expenseCategories[category]
      }
    });

    this.expenseChart = new CanvasJS.Chart("expense-stats", {
      animationEnabled: true,
      exportEnabled: true,
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });

    this.expenseChart.render();
  }

}
