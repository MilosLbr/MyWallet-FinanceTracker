import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Income } from 'src/app/_models/income';
import * as CanvasJS from '../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-income-charts',
  templateUrl: './income-charts.component.html',
  styleUrls: ['./income-charts.component.css']
})
export class IncomeChartsComponent implements OnInit {
  listOfIncomes : Income[];
  overallSum: number;
  
  incomeCategories = {};
  incomeChart: CanvasJS.Chart;
  

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {    
    this.userService.getIncomeRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Income[]) =>{
      this.listOfIncomes = data;
      this.overallSum = this.listOfIncomes.map(i => i.ammount).reduce((prev, current) => prev + current);
      
      this.prepareDataForChart(this.listOfIncomes);
      this.renderIncomeChart();
    },error => {
      this.alertify.error("An error happened while retrivieng list of income records!");  
    }); 
  }

  prepareDataForChart(incomes: Income[]){
    incomes.forEach(income => {
      if(this.incomeCategories[income.incomeCategory.incomeCategoryName]){
        this.incomeCategories[income.incomeCategory.incomeCategoryName] += income.ammount;
      }else{
        this.incomeCategories[income.incomeCategory.incomeCategoryName] = income.ammount;
      }
    });
  }

  renderIncomeChart(){
    const categories = Object.keys(this.incomeCategories);
    const dataPoints = categories.map(category => {
      return {
        label: category,
        y: this.incomeCategories[category]
      }
    })

    this.incomeChart = new CanvasJS.Chart("income-stats", {
      animationEnabled: true,
      exportEnabled: true,
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });

    this.incomeChart.render();
  }

}
