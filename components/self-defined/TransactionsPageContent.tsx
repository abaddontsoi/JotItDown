'use client';

import { CashAccount } from "@prisma/client";
import { DetailedTransaction, DialogModes } from "./types";
import TransactionsTableCard from "./TransactionsTableCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>(new Date());

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="w-fit">All transactions</CardTitle>

                    {/* Place a date filter component here */}
                    <div className="flex gap-2">
                        <div>
                            <Label>Start Date</Label>
                            {/* start date */}
                            <Input
                                className="w-fit"
                                type="date"
                                onChange={(event) => {
                                    setStartDate(new Date(event.target.value));
                                }}
                            />
                        </div>

                        <div>
                            <Label>End Date</Label>
                            {/* end date */}
                            <Input
                                className="w-fit"
                                type="date"
                                onChange={(event) => {
                                    setEndDate(new Date(event.target.value));
                                }}
                                defaultValue={(new Date()).toISOString()}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <TransactionsTableCard
                        transactions={transactions}
                        accounts={accounts}
                        setMode={setMode}
                        setTransaction={setTransaction}

                        // Date filters
                        startDate={startDate}
                        endDate={endDate}
                    />
                </CardContent>
            </Card>
        </>
    )
}