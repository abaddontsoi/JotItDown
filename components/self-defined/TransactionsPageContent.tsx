'use client';

import { ItemAccount } from "@prisma/client";
import { DetailedTransaction, DialogModes } from "./types";
import TransactionsTableCard from "./TransactionsTableCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Combobox } from "../ui/combobox";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface TransactionsPageContentProp {
    transactions: DetailedTransaction[];
    accounts: ItemAccount[];
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
    const router = useRouter();

    const [filterCollapse, setCollapse] = useState<boolean>(true);

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [fromAccountId, setFromAccountId] = useState<string>();
    const [toAccountId, setToAccountId] = useState<string>();

    const clrFilter = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setFromAccountId(undefined);
        setToAccountId(undefined);
        router.refresh();
    }
    return (
        <Card className="my-2">
            <CardHeader className="flex flex-col items-start">
                <CardTitle className="w-full flex justify-between">
                    All transactions
                    <Button
                        variant={'ghost'}
                        onClick={() => {
                            setCollapse(prev => !prev)
                        }}
                    >
                        {
                            filterCollapse ?
                                <>
                                    Show Filter
                                </> :
                                <>
                                    Hide Filter
                                </>
                        }
                    </Button>
                </CardTitle>

                {/* Place filter components here */}
                {
                    !filterCollapse &&
                    <div className="w-full">
                        <div className="flex gap-2 flex-wrap">
                            <div>
                                <Label>From Account</Label>
                                <Combobox
                                    options={
                                        accounts.map(ac => (
                                            {
                                                value: ac.id,
                                                label: ac.title,
                                            }
                                        ))
                                    }
                                    value={fromAccountId}
                                    onChange={(event) => {
                                        setFromAccountId(event.toString());
                                    }}
                                />
                            </div>

                            <div>
                                <Label>To Account</Label>
                                <Combobox
                                    options={
                                        accounts.map(ac => (
                                            {
                                                value: ac.id,
                                                label: ac.title,
                                            }
                                        ))
                                    }
                                    value={toAccountId}
                                    onChange={(event) => {
                                        setToAccountId(event.toString());
                                    }}
                                />
                            </div>

                            <div>
                                <Label>Start Date</Label>
                                {/* start date */}
                                <Input
                                    className="w-fit h-10"
                                    type="date"
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            setStartDate(new Date(event.target.value));
                                        } else {
                                            setStartDate(undefined);
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <Label>End Date</Label>
                                {/* end date */}
                                <Input
                                    className="w-fit h-10"
                                    type="date"
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            setEndDate(new Date(event.target.value));
                                        }
                                        else {
                                            setEndDate(undefined);
                                        }
                                    }}
                                />
                            </div>

                        </div>
                        <div className="w-full flex flex-row-reverse">
                            <Button
                                variant={'destructive'}
                                onClick={clrFilter}
                            >
                                Clear filter
                            </Button>
                        </div>
                    </div>
                }
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

                    // Account filter
                    fromAccountId={fromAccountId}
                    toAccountId={toAccountId}
                />
            </CardContent>
        </Card>
    )
}