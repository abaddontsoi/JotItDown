'use client';

import { ItemAccount } from "@prisma/client";
import { DetailedTransaction, Modes } from "./types";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "../ui/table";
import { Button } from "../ui/button";
import { NotebookPen, PenBoxIcon, PenLine, Pentagon, Settings, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TransactionsTableCardProp {
    transactions: DetailedTransaction[];
    accounts: ItemAccount[];
    setMode: (mode: Modes) => void;
    setTransaction: (transaction?: DetailedTransaction) => void;

    startDate?: Date;
    endDate?: Date;

    fromAccountId?: string;
    toAccountId?: string;

    quickSumMode?: boolean;
}

export default function TransactionsTableCard(
    {
        transactions,
        accounts,
        startDate,
        endDate,
        fromAccountId,
        toAccountId,
        quickSumMode,
        setMode,
        setTransaction,
    }: TransactionsTableCardProp
) {
    const router = useRouter();
    const headers = [
        "Created at",
        "From",
        "To",
        "Amount",
        "Actions",
    ]
    const handleDelete = async (id: string) => {
        try {
            axios.delete('/api/accounting/transaction', {
                data: {
                    id: id,
                },
            })
                .then(response => {
                    if (response.status == 200) {
                        toast(ToastDone);
                        setMode('Close');
                        setTransaction();
                        router.refresh();
                    } else {
                        toast(ToastError);
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast(ToastError);
                });
            toast(ToastLoading);
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }
    const [filtered, setFiltered] = useState<DetailedTransaction[]>(transactions)

    useEffect(() => {
        setFiltered(
            transactions
                .filter(t => {
                    if (!startDate) return true;
                    const compareDate = t.recordDate || t.createdAt;
                    return compareDate >= startDate;
                })
                .filter(t => {
                    if (!endDate) return true;
                    const compareDate = t.recordDate || t.createdAt;
                    return compareDate <= endDate;
                })
                .filter(t => !fromAccountId || t.from.accountid === fromAccountId)
                .filter(t => !toAccountId || t.to.accountid === toAccountId)
                .sort((a, b) => {
                    const dateA = a.recordDate || a.createdAt;
                    const dateB = b.recordDate || b.createdAt;
                    return dateB.getTime() - dateA.getTime();
                })
        );
    }, [startDate, endDate, fromAccountId, toAccountId, transactions]);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {
                        headers.map(header => (
                            <TableHead key={header} className="text-center">{header}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    filtered
                        .map(t => (
                            <TableRow key={t.id} className="hover:bg-gray-200 duration-300">
                                <TableCell className="text-center">
                                    {t.recordDate?.toDateString() || t.createdAt.toDateString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    {t.from.account?.title}
                                </TableCell>
                                <TableCell className="text-center">
                                    {t.to.account?.title}
                                </TableCell>
                                <TableCell className="text-center">
                                    {/* From's value == To's value */}
                                    {t.from.value}
                                </TableCell>
                                <TableCell className="text-center">
                                    {/* update button */}
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => {
                                            setTransaction(t);
                                            setMode('Edit');
                                        }}
                                    >
                                        <PenLine className="w-5 h-5" />
                                    </Button>
                                    {/* delete button */}
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => {
                                            handleDelete(t.id);
                                        }}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                }
                {
                    quickSumMode == true && (
                        <TableRow>
                            <TableCell className="text-center text-slate-400">Total</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-center">
                                {filtered.reduce((
                                    acc: number,
                                    item: DetailedTransaction
                                ) => {
                                    return acc + item.from.value;
                                }, 0)}
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )
}