export interface Income{
    id?: number,
    dateAdded?: Date,
    bankAccountId: number,
    incomeCategoryId: number,
    ammount: number,
    comment?: string,
    userId?: number,
    newBallance?: number
}