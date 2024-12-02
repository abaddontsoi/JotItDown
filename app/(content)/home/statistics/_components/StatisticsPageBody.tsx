'use client';

import { DetailedTransaction } from "@/components/self-defined/types";
import { StatisticsContent } from "./StatisticsContent";
import { usePathname } from "next/navigation";

interface StatisticsPageBodyProp {
    transactions: DetailedTransaction[];
}

export default function StatisticsPageBody({ transactions }: StatisticsPageBodyProp) {
    const pathname = usePathname();
    const isMonthly = pathname.includes('/thismonth');

    return (
        <div className="space-y-6 px-4 md:px-6 py-4">
            <StatisticsContent 
                transactions={transactions} 
                isMonthly={isMonthly} 
            />
        </div>
    );
}