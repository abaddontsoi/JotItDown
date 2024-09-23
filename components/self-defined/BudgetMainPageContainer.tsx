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
    return (
        <>
        <Suspense fallback={<ContextCardFallBack />}>
        <BudgetMainPage allDetailedCashFlow={await allDetailedCashFlow} />
        </Suspense>
        </>
    )
}

export default BudgetMainPageContainer;