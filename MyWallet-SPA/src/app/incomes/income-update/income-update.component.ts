import { Component, OnInit, ViewChild } from '@angular/core';
import { IncomeCategory } from 'src/app/_models/incomeCategory';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import {  BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-income-update',
  templateUrl: './income-update.component.html',
  styleUrls: ['./income-update.component.css']
})
export class IncomeUpdateComponent implements OnInit {  
  @ViewChild("editIncomeForm", {static: false}) editIncomeForm: NgForm;

  incomeCategoryId: number;
  dateAdded: Date;
  ammount: number;
  comment: string;
  incomeId: number;
  allIncomeCategories: IncomeCategory[];

  constructor(private modalRef: BsModalRef,private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  
  submitEditForm(){
    if(this.editIncomeForm.valid){
      const incomeUpdateDto =  this.editIncomeForm.value;
      incomeUpdateDto.id = this.incomeId;

      this.userService.updateIncomeRecord(this.authService.decodedToken.nameid, incomeUpdateDto).subscribe(()=> {
        this.alertify.success("Updated!");
        this.modalRef.hide();
      }, error=> {
        this.alertify.error("An error happened while updating income record!");
      })
    }
  }

}
