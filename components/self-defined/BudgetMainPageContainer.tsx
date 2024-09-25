import { Suspense } from "react";
import { PromiseDetailedCashFlowRecords } from "./types";
import ContextCardFallBack from "./ContextCardFallBack";
import BudgetMainPageHeaderBlock from "./BudgetMainPageHeaderBlock";
import BudgetSummaryThisMonthContainer from "./BudgetSummaryThisMonthContainer";

interface BudgetMainPageContainerProp {
    allDetailedCashFlow: PromiseDetailedCashFlowRecords
}

const BudgetMainPageContainer = async ({
    allDetailedCashFlow
}: BudgetMainPageContainerProp) => {
    const cashFlowRecords = await allDetailedCashFlow;
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth();
    return (
        <>
            <div className="flex flex-col gap-4">
                <Suspense fallback={<ContextCardFallBack />}>
                    <BudgetMainPageHeaderBlock allDetailedCashFlow={cashFlowRecords} />
                </Suspense>

                {/* Main page */}
                <Suspense fallback={<ContextCardFallBack />}>
                    <BudgetSummaryThisMonthContainer
                        thisMonthDetailedCashFlow={cashFlowRecords.filter(record => record.createdAt.getFullYear() == currentYear
                            && record.createdAt.getMonth() == currentMonth)}
                    />
                </Suspense>
            </div>
        </>
    )
}

export default BudgetMainPageContainer;