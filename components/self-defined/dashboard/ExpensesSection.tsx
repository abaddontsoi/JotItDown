'use client';

import { DetailedTransaction } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ExpensesSectionProps {
    expenses: Promise<DetailedTransaction[]>;
}

export const ExpensesSection = async ({ expenses }: ExpensesSectionProps) => {
    const data = await expenses;
    
    // Calculate total expenses
    const totalExpenses = data.reduce((acc, transaction) => acc + transaction.from.value, 0);

    // Group expenses by account
    const expensesByAccount = data.reduce((acc, transaction) => {
        const accountName = transaction.from.account?.title || 'Uncategorized';
        acc[accountName] = (acc[accountName] || 0) + transaction.from.value;
        return acc;
    }, {} as Record<string, number>);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>
                    {format(new Date(), 'MMMM yyyy')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-2xl font-bold">
                    ${totalExpenses.toFixed(2)}
                </div>

                <div className="space-y-2">
                    {Object.entries(expensesByAccount)
                        .sort(([, a], [, b]) => b - a)
                        .map(([account, amount]) => (
                            <div 
                                key={account} 
                                className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-100"
                            >
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{account}</Badge>
                                    <span className="text-sm text-muted-foreground">
                                        {((amount / totalExpenses) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <span className="font-medium">
                                    ${amount.toFixed(2)}
                                </span>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
}; 