import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Income } from 'src/app/_models/income';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IncomeUpdateComponent } from '../income-update/income-update.component';
import { ActivatedRoute } from '@angular/router';
import { IncomeCategory } from 'src/app/_models/incomeCategory';


@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  @Input() listOfIncomes : Income[];
  modalRef: BsModalRef;
  incomeRecordIdForDelete: number;
  incomeCategories:IncomeCategory[];

  constructor(private authService: AuthService, private modalService: BsModalService, private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {   
    this.route.data.subscribe((data ) => {
       this.incomeCategories = data.accountsAndCategories.incomeCategories;
    }); 
  }

  deleteIncomeRecord(incomRecordId: number, template: TemplateRef<any>){
    this.incomeRecordIdForDelete = incomRecordId;    

    this.modalRef = this.modalService.show(template);    

  }

  confirm(){
    this.userService.deleteIncomeRecord(this.authService.decodedToken.nameid, this.incomeRecordIdForDelete).subscribe(()=>{
      this.alertify.success('Deleted!');      
      this.modalRef.hide();
      // Refresh list
      this.userService.getIncomeRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Income[]) =>{
        this.listOfIncomes = data;
      }, error => {
        this.alertify.error("An error happened while retrivieng list of income records!");  
      });
    }, error =>{
      this.alertify.error("An error occured!");
    })
  }
  
  decline(){
    this.modalRef.hide();
  }

  openEditIncomeModal(income: Income){    
    const initialState = {
      incomeCategoryId: income.incomeCategory.id,
      ammount: income.ammount,
      comment: income.comment,
      incomeId: income.id,
      allIncomeCategories: this.incomeCategories
    }

    this.modalRef = this.modalService.show(IncomeUpdateComponent, {initialState});

    this.modalService.onHide.subscribe(() => {
      this.userService.getIncomeRecordsForUser(this.authService.decodedToken.nameid).subscribe((data: Income[]) =>{
        this.listOfIncomes = data;
      }, error => {
        this.alertify.error("An error happened while retrivieng list of income records!");  
      });
    })
  }

}
