'use client';

import { DetailedTransaction } from "@/components/self-defined/types";
import { StatisticsContent } from "./StatisticsContent";

interface StatisticsPageBodyProp {
    transactions: DetailedTransaction[];
    year?: number;
    month?: number;
    overall?: boolean;
}

export default function StatisticsPageBody({ 
    transactions, 
    year, 
    month,
    overall,
}: StatisticsPageBodyProp) {
    return (
        <div className="space-y-6 px-4 md:px-6 py-4">
            <StatisticsContent 
                transactions={transactions} 
                selectedYear={year}
                selectedMonth={month}
                overall={overall}
            />
        </div>
    );
}