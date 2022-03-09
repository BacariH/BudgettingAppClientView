import { TransactionHistory } from "./transaction-history.model";

export interface User {
    id?: number;
    userName: string;
    amountStart: number;
    transactionHistories: TransactionHistory[];
}
