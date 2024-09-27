'use client';

import { toDDMMYYYY } from "@/utils/formatters/date-formatter";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DetailedCashFlowRecord } from "./types";
import { Separator } from "../ui/separator";
import clsx from "clsx";

interface BudgetSummaryThisMonthProp {
    thisMonthDetailedCashFlow: DetailedCashFlowRecord[]
}


const BudgetSummaryThisMonth = (
    {
        thisMonthDetailedCashFlow
    }: BudgetSummaryThisMonthProp
) => {
    const headers = [
        'Date',
        'Account',
        'Income',
        'Expense',
    ]

    const allInCome: number = thisMonthDetailedCashFlow
        .filter(record => record.type == 'Income')
        .reduce(
            (
                acc: number,
                item: DetailedCashFlowRecord
            ) => {
                return acc + item.value;
            },
            0
        )

    const allExpense: number = thisMonthDetailedCashFlow
        .filter(record => record.type == 'Expense')
        .reduce(
            (
                acc: number,
                item: DetailedCashFlowRecord
            ) => {
                return acc + item.value;
            },
            0
        )

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {'This month\'s in/out'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {
                                    headers.map(h =>
                                        <TableHead className="text-center"  key={h}>
                                            {h}
                                        </TableHead>
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                thisMonthDetailedCashFlow.map((record, index) => (
                                    <>
                                        <TableRow className="text-center" key={record.id}>
                                            <TableCell>
                                                {
                                                    (index > 0 &&
                                                        record.createdAt.toDateString() == thisMonthDetailedCashFlow[index - 1].createdAt.toDateString() )?
                                                        '' : toDDMMYYYY(record.createdAt)
                                                }
                                            </TableCell>
                                            <TableCell>{record.title}</TableCell>
                                            <TableCell>
                                                {
                                                    record.type == 'Income' && record.value
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    record.type == 'Expense' && record.value
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))
                            }

                            <TableRow>
                                <TableCell>Total Expense: </TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-center">
                                    {/* {allInCome} */}
                                </TableCell>
                                <TableCell className="text-center">
                                    {allExpense}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total Income: </TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-center">
                                    {allInCome}
                                </TableCell>
                                <TableCell className="text-center">
                                    {/* {allExpense} */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border-t-4">Remaining: </TableCell>
                                <TableCell className="border-t-4"></TableCell>
                                <TableCell className="text-center border-t-4 border-t-green-400">
                                </TableCell>
                                <TableCell className={clsx(
                                    "text-center border-t-4",
                                    {
                                        "border-t-green-400": allInCome - allExpense > 0,
                                        "border-t-red-400": allInCome - allExpense <= 0,
                                    }
                                )}>
                                    {/* {allExpense} */}
                                    {
                                        allInCome - allExpense
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {/* <div className="flex flex-row justify-between items-center w-full text-xl">
                        <div>
                            Remaining
                        </div>
                        {
                            allInCome - allExpense
                        }
                    </div> */}
                </CardContent>
            </Card>
        </>
    )
}

export default BudgetSummaryThisMonth;