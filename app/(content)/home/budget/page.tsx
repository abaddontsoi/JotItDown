import BudgetMainPageContainer from "@/components/self-defined/BudgetMainPageContainer";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import { PromiseDetailedCashFlowRecords } from "@/components/self-defined/types";
import { db } from "@/lib/db";
import { Suspense } from "react";

const BudgetPage = async () => {
    const allDetailedCashFlow: PromiseDetailedCashFlowRecords = db.cashFlow.findMany({
        include: {
            CashFlowMtoMCategory: {
                include: {
                    cashFlowCategory: true
                }
            }
        }
    });

    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <BudgetMainPageContainer
                    allDetailedCashFlow={allDetailedCashFlow}
                />
            </Suspense>
        </>
    )
}

export default BudgetPage;