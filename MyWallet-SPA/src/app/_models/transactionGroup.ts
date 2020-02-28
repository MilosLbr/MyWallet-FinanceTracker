import { Transaction } from './transaction';

export interface TransactionGroup{
    date: Date,
    transactions: Transaction[]
}