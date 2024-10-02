import { Suspense } from "react";
import { PromiseDetailedAccountRecords, PromiseDetailedCashFlowRecords } from "./types";
import ContextCardFallBack from "./ContextCardFallBack";
import BudgetMainPageHeaderBlock from "./BudgetMainPageHeaderBlock";
import BudgetSummaryThisMonthContainer from "./BudgetSummaryThisMonthContainer";
import AccountCardsContainer from "./AccountCardsContainer";

interface BudgetMainPageContainerProp {
    allDetailedCashFlow: PromiseDetailedCashFlowRecords
    allAccountsRecords: PromiseDetailedAccountRecords
}

const BudgetMainPageContainer = async ({
    allDetailedCashFlow,
    allAccountsRecords,
}: BudgetMainPageContainerProp) => {
    const cashFlowRecords = await allDetailedCashFlow;
    const accountRecords = await allAccountsRecords;
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
                        thisMonthDetailedCashFlow={cashFlowRecords
                            .filter(record => record.createdAt.getFullYear() == currentYear && record.createdAt.getMonth() == currentMonth)
                        }
                    />
                </Suspense>

                <Suspense fallback={<ContextCardFallBack />}>
                    <AccountCardsContainer records={accountRecords} />
                </Suspense>
            </div>
        </>
    )
}

export default BudgetMainPageContainer;