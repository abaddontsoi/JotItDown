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

    // Calculate total value
    const totalValue = transactions.reduce((sum, t) => sum + t.from.value, 0);
    
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
                            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Average Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${(totalValue / transactions.length || 0).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Most Expensive Transaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {transactions.length > 0 ? (
                                <div>
                                    <div className="text-2xl font-bold">
                                        ${Math.max(...transactions.map(t => t.from.value)).toFixed(2)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {transactions.reduce((max, t) => t.from.value > max.from.value ? t : max).from.account?.title} →{' '}
                                        {transactions.reduce((max, t) => t.from.value > max.from.value ? t : max).to.account?.title}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold">N/A</div>
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