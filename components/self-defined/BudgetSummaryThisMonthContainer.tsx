import { Suspense } from "react";
import BudgetSummaryThisMonth from "./BudgetSummaryThisMonth";
import ContextCardFallBack from "./ContextCardFallBack";
import { DetailedCashFlowRecord } from "./types";

interface BudgetSummaryThisMonthContainerProp {
    thisMonthDetailedCashFlow: DetailedCashFlowRecord[]
}

const BudgetSummaryThisMonthContainer = async (
    {
        thisMonthDetailedCashFlow
    }: BudgetSummaryThisMonthContainerProp
) => {
    return (
        <>
            <BudgetSummaryThisMonth
                thisMonthDetailedCashFlow={thisMonthDetailedCashFlow}
            />
        </>
    )
}

export default BudgetSummaryThisMonthContainer;