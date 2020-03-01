import { IncomeCategory } from './incomeCategory';
import { BankAccount } from './bankAccount';

export interface Income{
    id?: number,
    dateAdded?: Date,
    bankAccountId: number,
    incomeCategoryId: number,
    ammount: number,
    comment?: string,
    userId?: number,
    newBallance?: number,
    incomeCategory?: IncomeCategory,
    bankAccount?: BankAccount
}