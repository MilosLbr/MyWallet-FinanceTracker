export interface Transaction{
    id: number,
    dateAdded: Date,
    ammount: number,
    comment: string,
    newBallance?: number,
    transactionType: string,
    categoryName: string
}