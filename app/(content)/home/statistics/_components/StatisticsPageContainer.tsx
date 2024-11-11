import { DetailedTransaction, PromiseDetailedTransaction } from "@/components/self-defined/types"
import StatisticsPage from "./StatisticsPage";
import { Suspense } from "react";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";

interface StatisticsPageContainerProp {
    transactions: PromiseDetailedTransaction;
}

export default async function StatisticsPageContainer(
    {
        transactions,
    }: StatisticsPageContainerProp
) {
    const t: DetailedTransaction[] = await transactions;

    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <StatisticsPage 
                transactions={t}
            />
        </Suspense>
    )
}