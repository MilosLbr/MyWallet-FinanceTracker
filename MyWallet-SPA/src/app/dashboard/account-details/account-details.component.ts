import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { TransactionGroup } from 'src/app/_models/transactionGroup';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import * as CanvasJS from '../../../assets/canvasjs.min.js';


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  @Input() transactions: TransactionGroup[];
  @Input() selectedBankAccountId: number;
  @Input() selectedBankAccountName: string;
  @Output() emmitConfirmedDeletion: EventEmitter<boolean> = new EventEmitter();
  modalRef: BsModalRef;
  
  accountBallanceChangheInTime: any;
  ballanceChart: CanvasJS.Chart;
  
  constructor(private modalService: BsModalService, private authService: AuthService,private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.accountBallanceChangheInTime = this.transactions.map(tg => {
      let ballance = tg.transactions.map(t => t.newBallance)[0];
      return {
        x: new Date(tg.date),
        y: ballance
      }
    }).reverse();  

  }

  deleteSelectedBankAccount(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);    
  }

  confirm(){
    this.userService.deleteBankAccount(this.authService.decodedToken.nameid, this.selectedBankAccountId).subscribe(() => {
      this.alertify.success("Deleted account!")      
      this.modalRef.hide();    
      this.emmitConfirmedDeletion.emit(true);
      this.transactions = [];
    }, error => {
      this.alertify.error("An error happened while deleting bank account with id: " + this.selectedBankAccountId);
    })
  }

  decline(){
    this.modalRef.hide();
  }


}
