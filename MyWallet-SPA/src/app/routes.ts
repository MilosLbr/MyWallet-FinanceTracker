import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth-guard.service';
import { BankAccountsAndCategoriesResolver } from './_resolvers/BankAccountsAndCategories.resolver';
import { AccountChartsComponent } from './dashboard/account-charts/account-charts.component';
import { IncomeChartsComponent } from './incomes/income-charts/income-charts.component';
import { ExpenseChartsComponent } from './expenses/expense-charts/expense-charts.component';

export const appRoutes : Routes= [
    {path: "", component: HomeComponent},
    {path: "incomes", canActivate:[AuthGuard], component: IncomesComponent , 
    resolve: {accountsAndCategories : BankAccountsAndCategoriesResolver}},
    {path: "incomes/stats", canActivate: [AuthGuard], component: IncomeChartsComponent},
    {path: "expenses", canActivate:[AuthGuard], component: ExpensesComponent, 
    resolve: {accountsAndCategories : BankAccountsAndCategoriesResolver}},
    {path: "expenses/stats", canActivate: [AuthGuard], component: ExpenseChartsComponent},
    {path: "dashboard", canActivate:[AuthGuard], component: DashboardComponent},
    {path: "dashboard/:accountId/:accountName", canActivate: [AuthGuard], component: AccountChartsComponent},
    {path : '**', redirectTo: 'dashboard', pathMatch: 'full'}
]