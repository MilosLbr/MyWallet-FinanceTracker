import { BankAccount } from './bankAccount';
import { IncomeCategory } from './incomeCategory';
import { ExpenseCategory } from './expenseCategory';

export interface AccountsAndCategories{
    bankAccounts: BankAccount[],
    incomeCategories: IncomeCategory[],
    expenseCategories: ExpenseCategory[]
}