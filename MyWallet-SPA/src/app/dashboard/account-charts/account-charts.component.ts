import { Component, OnInit } from '@angular/core';
import { TransactionGroup } from 'src/app/_models/transactionGroup';
import * as CanvasJS from '../../../assets/canvasjs.min.js';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service.js';
import { AuthService } from 'src/app/_services/auth.service.js';
import { AlertifyService } from 'src/app/_services/alertify.service.js';

@Component({
  selector: 'app-account-charts',
  templateUrl: './account-charts.component.html',
  styleUrls: ['./account-charts.component.css']
})
export class AccountChartsComponent implements OnInit {
  transactions: TransactionGroup[];
  bankAccountId: number;
  accountName: string;

  accountBallanceChangheInTime: any;
  ballanceChart: CanvasJS.Chart;

  incomeCategories = {};
  incomePieChart: CanvasJS.Chart;
  overallIncomes: number = 0;

  expenseCategories = {};
  expensePieChart: CanvasJS.Chart;
  overallExpenses: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.bankAccountId = this.route.snapshot.params["accountId"];
    this.accountName = this.route.snapshot.params["accountName"];

    this.userService.getTransactionsOnBankAccount(this.authService.decodedToken.nameid, this.bankAccountId).subscribe((data: TransactionGroup[])=>{
      this.transactions = data;

      this.accountBallanceChangheInTime = this.prepareDataForBalanceChangeChart(this.transactions);

      this.prepareDataForIncomePieChart(this.transactions);
      this.prepareDataForExpensePieChart(this.transactions);
  
      this.renderBallanceChangeChart();
      this.renderIncomePieChart();
      this.renderExpensePieChart();
    }, error => {
      this.alertify.error("An error happened while retrieving bank account data!");
    });

  }

  prepareDataForBalanceChangeChart(transactions: TransactionGroup[]){
    let chartData = transactions.map(tg => {
      let ballance = tg.transactions.map(t => t.newBallance)[0];
      return {
        x: new Date(tg.date),
        y: ballance
      }
    }).reverse();

    return chartData;
  }

  renderBallanceChangeChart(){
    
    this.ballanceChart = new CanvasJS.Chart("account-ballance-change", {
      title:{
        text: "Account ballance changes"
      },
      exportEnabled:true,
      animationEnabled: true,
      backgroundColor: "transparent",
      theme: "light2",
      data: [{
        type: "spline",
        yValueFormatString: "$###,###.##",
        dataPoints: this.accountBallanceChangheInTime
      }]
    });

    this.ballanceChart.render();
  }

  prepareDataForIncomePieChart(transactions: TransactionGroup[]){

    let transactionsArray = transactions.map(tg => {
      return tg.transactions
    })

    let incomeTransactions = transactionsArray.map(tr => {
      let income = tr.filter(t => t.transactionType === "Income");
      return income;
    }).filter(el => el.length > 0);

    incomeTransactions.forEach(incomesArr => {
      incomesArr.forEach(element => {
        if(this.incomeCategories[element.categoryName]){
          this.incomeCategories[element.categoryName] += element.ammount;
        }else{
          this.incomeCategories[element.categoryName] = element.ammount;
        }

        this.overallIncomes += element.ammount;
      });
    });

    
  }

  renderIncomePieChart(){ 

    const categories = Object.keys(this.incomeCategories);
    const dataPoints = categories.map(category => {
      return {
        name: category,
        y: this.incomeCategories[category]
      }
    });
    
    this.incomePieChart = new CanvasJS.Chart("income-by-category", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: "Incomes"
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: dataPoints
          }]
    })

    this.incomePieChart.render();
  }

  prepareDataForExpensePieChart(transactions: TransactionGroup[]){
    let transactionsArray = transactions.map(tg => {
      return tg.transactions
    });

    let expenseTransactions = transactionsArray.map(tr => {
      let expense = tr.filter(t => t.transactionType === "Expense");
      return expense;
    }).filter(el => el.length > 0);


    expenseTransactions.forEach(expenseArr => {
      expenseArr.forEach(element => {
        if(this.expenseCategories[element.categoryName]){
          this.expenseCategories[element.categoryName] += element.ammount;
        }else{
          this.expenseCategories[element.categoryName] = element.ammount;
        }
        this.overallExpenses += element.ammount;
      });
    });
  }

  renderExpensePieChart(){
    const categories = Object.keys(this.expenseCategories);
    const dataPoints = categories.map(category => {
      return {
        name: category,
        y: this.expenseCategories[category]
      }
    });

    this.expensePieChart = new CanvasJS.Chart("expense-by-category",{
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Expenses"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: dataPoints
      }]
    });

    this.expensePieChart.render();
  }



}
