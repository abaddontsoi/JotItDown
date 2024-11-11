'use client';

import { DetailedTransaction } from "@/components/self-defined/types";
import StatisticsPageHeader from "./StatisticsPageHeader";
import StatisticsPageBody from "./StatisticsPageBody";
import { useStatistics } from "@/app/contexts/statistics/StatisticsContext";

interface StatisticsPageProp {
    transactions: DetailedTransaction[];
}

export default function StatisticsPage(
    {
        transactions
    }: StatisticsPageProp
) {

    const context = useStatistics();
    
    context.setTransactions(transactions);

    return (
        <>
            {/* Dialogs */}

            {/* Header */}
            <StatisticsPageHeader />

            {/* Body */}
            <StatisticsPageBody />
        </>
    )
}