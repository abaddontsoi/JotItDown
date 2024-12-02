'use client';

import { DetailedTransaction } from "@/components/self-defined/types";
import { StatisticsContent } from "./StatisticsContent";

interface StatisticsPageBodyProp {
    transactions: DetailedTransaction[];
    year?: number;
    month?: number;
}

export default function StatisticsPageBody({ 
    transactions, 
    year, 
    month 
}: StatisticsPageBodyProp) {
    return (
        <div className="space-y-6 px-4 md:px-6 py-4">
            <StatisticsContent 
                transactions={transactions} 
                isMonthly={!!month && !!year}
                selectedYear={year}
                selectedMonth={month}
            />
        </div>
    );
}