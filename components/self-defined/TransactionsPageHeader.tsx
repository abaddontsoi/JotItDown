'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { DetailedTransaction, Modes } from "./types";

interface TransactionsPageHeaderProp {
    setMode: (mode: Modes) => void;
    setTransaction: (t?: DetailedTransaction) => void;
}

export default function TransactionsPageHeader(
    {
        setMode,
        setTransaction,
    }: TransactionsPageHeaderProp
) {
    return (
        <div className="flex items-center justify-between w-full px-4 py-2">
            <h1 className="text-5xl">Transactions</h1>
            <div>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        setMode('Create');
                    }}
                >
                    <Plus className="w-5 h-5"/> Transaction
                </Button>
            </div>
        </div>
    )
}