import { Component, OnInit } from '@angular/core';
import { Income } from '../_models/income';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  
  listOfIncomes : Income[];

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {     
  }

  ngOnInit() {  
    this.getListOfIncomes();     
  }

  notificationFromCreateComponent(shouldUpdateList: boolean){
    if(shouldUpdateList){
      // refresh list of incomes after submiting new one
      this.getListOfIncomes();
    }
  }

  getListOfIncomes(){
    this.userService.getIncomeRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Income[]) =>{
      this.listOfIncomes =data;
    },error => {
      this.alertify.error("An error happened while retrivieng list of income records!");  
    }); 
  }


}
