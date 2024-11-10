'use client';

import { useState } from "react";
import TransactionsPageHeader from "./TransactionsPageHeader";
import { DetailedTransaction, DialogModes } from "./types"
import { itemAccount } from "@prisma/client";
import { AccountTransactionDialog } from "./AccountTransactionDialog";
import TransactionsPageContent from "./TransactionsPageContent";
import { Toaster } from "../ui/toaster";

interface TransactionsPageProp {
    transactions: DetailedTransaction[];
    accounts: itemAccount[];
}

export default function TransactionsPage(
    {
        transactions,
        accounts
    }: TransactionsPageProp
) {
    const [mode, setMode] = useState<DialogModes>('Close');
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
            <TransactionsPageContent
                transactions={transactions}
                accounts={accounts}
                setMode={setMode}
                setTransaction={setTransaction}
            />
            <Toaster />
        </>
    )
}