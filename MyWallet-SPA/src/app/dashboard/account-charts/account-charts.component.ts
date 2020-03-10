import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { TransactionGroup } from 'src/app/_models/transactionGroup';
import * as CanvasJS from '../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-account-charts',
  templateUrl: './account-charts.component.html',
  styleUrls: ['./account-charts.component.css']
})
export class AccountChartsComponent implements OnInit {
  @Input()transactions: TransactionGroup[];
  @Input()accountName: string;
  ballanceChart: any;

  constructor() { }

  ngOnInit() {
    let accountBallanceInTime = this.transactions.map(tg => {
      let ballance = tg.transactions.map(t => t.newBallance)[0];
      return {
        date: tg.date,
        ballance: ballance
      }
    }).reverse();
    console.log(accountBallanceInTime);

    const dataPoints = [];
    accountBallanceInTime.forEach(element => {
      dataPoints.push({
        x: new Date(element.date),
        y: element.ballance
      })
    });
    console.log(dataPoints);

    this.ballanceChart = new CanvasJS.Chart("account-ballance-change", {
      title:{
        text: "Account ballance changes"
      },
      animationEnabled: true,
      backgroundColor: "transparent",
      theme: "light2",
      data: [{
        type: "spline",
        yValueFormatString: "$###,###.##",
        dataPoints: dataPoints
      }]
    });

    this.ballanceChart.render();
  }



}
