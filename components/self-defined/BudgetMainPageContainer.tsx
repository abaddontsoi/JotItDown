import { Suspense } from "react";
import { PromiseDetailedCashFlowRecords } from "./types";
import ContextCardFallBack from "./ContextCardFallBack";
import BudgetMainPage from "./BudgetMainPage";

interface BudgetMainPageContainerProp {
    allDetailedCashFlow: PromiseDetailedCashFlowRecords
}

const BudgetMainPageContainer = async ({
    allDetailedCashFlow
}: BudgetMainPageContainerProp) => {
    const cashFlowRecords = await allDetailedCashFlow;

    return (
        <>
        <Suspense fallback={<ContextCardFallBack />}>
        <BudgetMainPage allDetailedCashFlow={cashFlowRecords} />
        </Suspense>
        </>
    )
}

export default BudgetMainPageContainer;