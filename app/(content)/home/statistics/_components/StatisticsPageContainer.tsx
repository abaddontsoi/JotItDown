import { DetailedTransaction, PromiseDetailedTransaction } from "@/components/self-defined/types"
import StatisticsPage from "./StatisticsPage";
import { Suspense } from "react";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import StatisticsPageBody from "./StatisticsPageBody";
import StatisticsPageHeader from "./StatisticsPageHeader";

interface StatisticsPageContainerProps {
    transactions: Promise<DetailedTransaction[]>;
    year?: number;
    month?: number;
}

export default async function StatisticsPageContainer({ 
    transactions,
    year,
    month
}: StatisticsPageContainerProps) {
    const transactionsData = await transactions;

    return (
        <div className="space-y-4">
            <StatisticsPageHeader year={year} month={month} />
            <StatisticsPageBody transactions={transactionsData} />
        </div>
    );
}