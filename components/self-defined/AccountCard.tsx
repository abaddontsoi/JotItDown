'use client';

import { CashFlowType } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DetailedAccountRecord, DetailedCashFlowRecord } from "./types";
import { toDDMMYYYY } from "@/utils/formatters/date-formatter";
import clsx from "clsx";

interface AccountCardProp {
    record: DetailedAccountRecord
}

const AccountCard = (
    {
        record
    }: AccountCardProp
) => {
    const cashFlows = record.CashFlow;
    const totalDebit = record.CashFlow.filter(cash => cash.type == CashFlowType.Debit).reduce(
        (
            total: number,
            item: DetailedCashFlowRecord
        ) => {
            return total + item.value;
        },
        0
    );
    const totalCredit = record.CashFlow.filter(cash => cash.type == CashFlowType.Credit).reduce(
        (
            total: number,
            item: DetailedCashFlowRecord
        ) => {
            return total + item.value;
        },
        0
    );

    const balance: number = totalDebit - totalCredit;

    const headers = [
        'Date',
        'Account',
        'Debit',
        'Credit',
    ]


    return (
        <Card>
            <CardHeader>
                <CardTitle>{record.title}</CardTitle>
                {
                    record.description && <CardDescription>{record.description}</CardDescription>
                }
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {/* Actions */}
                            </TableHead>
                            {
                                headers.map(h =>
                                    <TableHead className="text-center" key={h}>
                                        {h}
                                    </TableHead>
                                )
                            }
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            cashFlows.map((cash, index) => (
                                <TableRow key={cash.id} className="text-center">
                                    <TableCell></TableCell>
                                    <TableCell>
                                        {
                                            (index > 0 &&
                                                cash.createdAt.toDateString() == cashFlows[index - 1].createdAt.toDateString()) ?
                                                '' : toDDMMYYYY(cash.createdAt)
                                        }
                                    </TableCell>
                                    <TableCell>{cash.category}</TableCell>
                                    <TableCell>
                                        {
                                            cash.type == CashFlowType.Debit &&
                                            cash.value
                                        }
                                    </TableCell>
                                    <TableCell>{
                                        cash.type == CashFlowType.Credit &&
                                        cash.value
                                    }</TableCell>
                                    {/* <TableCell>{ }</TableCell> */}
                                </TableRow>
                            ))
                        }

                        <TableRow className="text-center">
                            <TableCell></TableCell>
                            <TableCell className="border-t-4">Balance </TableCell>
                            <TableCell className="border-t-4"></TableCell>
                            <TableCell className="text-center border-t-4 border-t-green-400">
                            </TableCell>
                            <TableCell className={clsx(
                                "text-center border-t-4",
                                {
                                    "border-t-green-400": balance > 0,
                                    "border-t-red-400": balance <= 0,
                                }
                            )}>
                                {/* {allExpense} */}
                                {
                                    balance
                                }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AccountCard;