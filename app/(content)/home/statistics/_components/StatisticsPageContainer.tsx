import { DetailedTransaction, PromiseDetailedTransaction } from "@/components/self-defined/types"
import StatisticsPageBody from "./StatisticsPageBody";
import StatisticsPageHeader from "./StatisticsPageHeader";

interface StatisticsPageContainerProps {
    transactions: Promise<DetailedTransaction[]>;
    year?: number;
    month?: number;
    overall?: boolean;
}

export default async function StatisticsPageContainer({ 
    transactions,
    year,
    month,
    overall
}: StatisticsPageContainerProps) {
    const transactionsData = await transactions;

    return (
        <div className="space-y-4">
            <StatisticsPageHeader year={year} month={month} />
            <StatisticsPageBody 
                transactions={transactionsData} 
                year={year}
                month={month}
                overall={overall}
            />
        </div>
    );
}