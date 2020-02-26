import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth-guard.service';

export const appRoutes : Routes= [
    {path: "", component: HomeComponent},
    {path: "incomes", canActivate:[AuthGuard],component: IncomesComponent},
    {path: "expenses", canActivate:[AuthGuard], component: ExpensesComponent},
    {path: "dashboard", canActivate:[AuthGuard], component: DashboardComponent},
    {path : '**', redirectTo: 'dashboard', pathMatch: 'full'}
]