'use client';

import { useEffect, useState } from "react";
import TransactionsPageHeader from "./TransactionsPageHeader";
import { DetailedTransaction, Modes } from "./types"
import { ItemAccount } from "@prisma/client";
import { AccountTransactionDialog } from "./AccountTransactionDialog";
import AllTransactions from "./AllTransactions";
import { Toaster } from "../ui/toaster";

interface TransactionsPageProp {
    transactions: DetailedTransaction[];
    accounts: ItemAccount[];
}

export default function TransactionsPage(
    {
        transactions,
        accounts
    }: TransactionsPageProp
) {
    const [mode, setMode] = useState<Modes>('Close');
    const [selectedTransaction, setTransaction] = useState<DetailedTransaction>();

    return (
        <>
            {/* Required dialogs */}
            <AccountTransactionDialog
                mode={mode}
                transaction={selectedTransaction}
                allAccounts={accounts}
                setMode={setMode}
            />

            {/* Header */}
            <TransactionsPageHeader
                setMode={setMode}
                setTransaction={setTransaction}
            />

            {/* Content */}
            <div className="px-4">
                <AllTransactions
                    transactions={transactions}
                    accounts={accounts}
                    setMode={setMode}
                    setTransaction={setTransaction}
                />
            </div>
            <Toaster />
        </>
    )
}