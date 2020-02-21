import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './_services/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth-guard.service';


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      RegisterComponent,
      LoginComponent,
      IncomesComponent,
      ExpensesComponent,
      DashboardComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule,
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
