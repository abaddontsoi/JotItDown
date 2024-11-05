'use client';

import { CashAccount } from "@prisma/client";
import { DetailedTransaction, DialogModes } from "./types";
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

interface TransactionsTableCardProp {
    transactions: DetailedTransaction[];
    accounts: CashAccount[];
    setMode: (mode: DialogModes) => void;
    setTransaction: (transaction?: DetailedTransaction) => void;

    startDate?: Date;
    endDate?: Date;
}

export default function TransactionsTableCard(
    {
        transactions,
        accounts,
        startDate,
        endDate,
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

    return (
        <>
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
                        transactions
                        .filter(t => {
                            return !endDate || !startDate || (t.createdAt <= endDate && t.createdAt >= startDate);
                        })
                        .map(t => (
                            <TableRow key={t.id}>
                                <TableCell className="text-center">
                                    {t.createdAt.toDateString()}
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
                </TableBody>
            </Table>
        </>
    )
}