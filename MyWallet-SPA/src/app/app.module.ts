import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

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
import { AccountDetailsComponent } from './dashboard/account-details/account-details.component';
import { UserService } from './_services/user.service';
import { DatePipe } from '@angular/common';


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
      AccountDetailsComponent
      
   ],
   imports: [
      BrowserModule,
      FormsModule,
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
      DatePipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
