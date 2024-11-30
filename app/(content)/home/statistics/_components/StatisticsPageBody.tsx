'use client';

import { useState } from "react";
import { useStatistics } from "@/app/contexts/statistics/StatisticsContext";
import { DetailedTransaction } from "@/components/self-defined/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/app/lib/utils";
import RecentTransactions from "./RecentTransactions";

interface StatisticsPageBodyProp {
    transactions: DetailedTransaction[];
}

export default function StatisticsPageBody({ transactions }: StatisticsPageBodyProp) {
    const ctx = useStatistics();

    // Calculate total spending value
    const totalSpendingValue = transactions
        .filter(t => t.from.account?.isPersonalSpending)
        .reduce((sum, t) => sum + t.from.value, 0);


    const findMaxValueTransaction = () => {
        if (transactions.length === 0) return null;
        const personalTransactions = transactions.filter(t => t.from.account?.isPersonalSpending);
        if (personalTransactions.length === 0) return null;
        return personalTransactions.reduce((max, t) => t.from.value > max.from.value ? t : max, personalTransactions[0]);
    }

    const maxTransaction = findMaxValueTransaction();

    return (
        <div className="space-y-6 px-4 md:px-6 py-4">
            <div className="grid gap-6">
                {/* Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{transactions.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Total Spending Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalSpendingValue.toFixed(2)}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Average Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${(totalSpendingValue / transactions.length || 0).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Most Expensive Personal Transaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {maxTransaction ? (
                                <div>
                                    <div className="text-2xl font-bold">
                                        ${maxTransaction.from.value.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {maxTransaction.from.account?.title} → {maxTransaction.to.account?.title}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold">No personal transactions</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Transactions Component */}
                <RecentTransactions transactions={transactions} />
            </div>
        </div>
    );
}