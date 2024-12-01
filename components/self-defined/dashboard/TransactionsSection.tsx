'use client';

import { DetailedTransaction } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export const TransactionsSection = async ({ transactions }: { transactions: Promise<DetailedTransaction[]> }) => {
    const data = await transactions;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map(transaction => (
                    <div key={transaction.id} className="p-3 rounded-lg hover:bg-slate-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">{transaction.from.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">${transaction.from.value}</p>
                                <p className="text-sm text-muted-foreground">
                                    {transaction?.from?.account?.title || 'No title'} → {transaction?.to?.account?.title || 'No title'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}; 