import { Component, OnInit, Input } from '@angular/core';
import { Income } from 'src/app/_models/income';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  @Input() listOfIncomes : Income[];

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {    
  }

  deleteIncomeRecord(incomreRecordId: number, event){
    var button = event.target;
    button.disabled = true;

    this.userService.deleteIncomeRecord(this.authService.decodedToken.nameid, incomreRecordId).subscribe(()=>{
      this.alertify.success('Deleted!');

      // Refresh list
      this.userService.getIncomeRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Income[]) =>{
        this.listOfIncomes =data;
      }, error => {
        this.alertify.error("An error happened while retrivieng list of income records!");  
      });
    }, error =>{
      this.alertify.error("An error occured!");

    })
  }

}
