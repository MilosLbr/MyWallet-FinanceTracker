import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './_services/alertify.service';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { appRoutes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth-guard.service';
import { AccountDetailsComponent } from './dashboard/account-details/account-details.component';
import { UserService } from './_services/user.service';
import { IncomesResolver } from './_resolvers/incomes.resolver';
import { IncomeCreateComponent } from './incomes/income-create/income-create.component';
import { IncomeListComponent } from './incomes/income-list/income-list.component';
import { CreateAccountModalComponent } from './dashboard/create-account-modal/create-account-modal.component';
import { EditAccountModalComponent } from './dashboard/edit-account-modal/edit-account-modal.component';


export function jwtOptionsFactory() {
   return {
     tokenGetter: () => sessionStorage.getItem("token"),
     whitelistedDomains: ['localhost:44301']
   };
};

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      RegisterComponent,
      LoginComponent,
      IncomesComponent,
      ExpensesComponent,
      DashboardComponent,
      CreateAccountModalComponent,
      EditAccountModalComponent,
      AccountDetailsComponent,
      IncomeCreateComponent,
      IncomeListComponent
      
   ],
   entryComponents:[
      CreateAccountModalComponent,
      EditAccountModalComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      ModalModule.forRoot(),
      HttpClientModule,
      AppRoutingModule,
      JwtModule.forRoot({
         jwtOptionsProvider:{
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory
         }
      }),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes)
      
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard,
      UserService,
      DatePipe,
      IncomesResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
