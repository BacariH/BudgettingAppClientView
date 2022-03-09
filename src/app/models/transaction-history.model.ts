export interface TransactionHistory {
    id?: number;
    createdTransaction: Date;
    amountOfTransaction: number;
    transactionDescription: string;
    transactionType: string;
}
