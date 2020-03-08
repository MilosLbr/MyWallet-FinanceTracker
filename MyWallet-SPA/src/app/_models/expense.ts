import { BankAccount } from './bankAccount';
import { ExpenseCategory } from './expenseCategory';

export interface Expense{
    id?: number,
    dateAdded?: Date,
    bankAccountId: number,
    expenseCategoryId: number,
    ammount: number,
    comment?: string,
    userId?: number,
    newBallance?: number,
    bankAccount?: BankAccount,
    expenseCategory?: ExpenseCategory
}