'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { DetailedTransaction, DialogModes } from "./types";

interface TransactionsPageHeaderProp {
    setMode: (mode: DialogModes) => void;
    setTransaction: (t?: DetailedTransaction) => void;
}

export default function TransactionsPageHeader(
    {
        setMode,
        setTransaction,
    }: TransactionsPageHeaderProp
) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-5xl">Transactions</h1>

            <div>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        setMode('Create');
                    }}
                >
                    <Plus /> Transaction
                </Button>
            </div>
        </div>
    )
}