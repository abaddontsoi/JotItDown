'use client';

import { CashAccount } from "@prisma/client";
import { DetailedTransaction, DialogModes } from "./types";

interface TransactionsPageContentProp {
    transactions: DetailedTransaction[];
    accounts: CashAccount[];
    setMode: (mode: DialogModes) => void;
    setTransaction: (transaction?: DetailedTransaction) => void;
}

export default function TransactionsPageContent(
    {
        transactions,
        accounts,
        setMode,
        setTransaction,
    }: TransactionsPageContentProp
) {
    return (
        <>

        </>
    )
}