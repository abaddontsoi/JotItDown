'use client';

import { CashAccount } from "@prisma/client";
import { DetailedTransaction, DialogModes } from "./types";
import TransactionsTableCard from "./TransactionsTableCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
            <Card>
                <CardHeader>
                    <CardTitle>All transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <TransactionsTableCard
                        transactions={transactions}
                        accounts={accounts}
                        setMode={setMode}
                        setTransaction={setTransaction}
                        // Date filters
                    />
                </CardContent>
            </Card>
        </>
    )
}