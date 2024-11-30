'use client';

import { ItemAccount } from "@prisma/client";
import { DetailedTransaction, Modes } from "./types";
import TransactionsTableCard from "./TransactionsTableCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Combobox } from "../ui/combobox";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { DownloadIcon, FileText } from "lucide-react";
import axios from "axios";
import { ToastError } from "./toast-object";
import { toast } from "../ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TransactionsPageContentProp {
    transactions: DetailedTransaction[];
    accounts: ItemAccount[];
    setMode: (mode: Modes) => void;
    setTransaction: (transaction?: DetailedTransaction) => void;
}

export default function AllTransactions(
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

    const [quickSumMode, setQuickSumMode] = useState<boolean>(false);

    const clrFilter = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setFromAccountId(undefined);
        setToAccountId(undefined);
        router.refresh();
    }

    const handleQuickSum = () => {
        setQuickSumMode(prev => !prev);
    }

    const handleDownload = async () => {
        try {
            const response = await axios.post('/api/accounting/transaction/download', {
                startDate,
                endDate,
                fromAccountId,
                toAccountId
            }, {
                responseType: 'blob'  // Important for file download
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'TransactionsLog.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast(ToastError);
        }
    };

    const handlePdfDownload = async () => {
        try {
            const response = await axios.post('/api/accounting/transaction/download/pdf', {
                startDate,
                endDate,
                fromAccountId,
                toAccountId
            }, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'TransactionsSummary.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast(ToastError);
        }
    };

    return (
        <Card className="my-2">
            <CardHeader className="flex flex-col items-start">
                <CardTitle className="w-full flex justify-between items-center">
                    All transactions
                    <div className="flex gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <DownloadIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleDownload}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Download CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handlePdfDownload}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Download PDF
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant={quickSumMode ? 'secondary' : 'ghost'}
                            onClick={handleQuickSum}
                        >
                            Quick Sum
                        </Button>

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
                    </div>
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

                    // Show quick sum?
                    quickSumMode={quickSumMode}
                />
            </CardContent>
        </Card>
    )
}