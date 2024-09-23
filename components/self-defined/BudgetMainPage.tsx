'use client';

import BudgetMainPageHeader from "./BudgetMainPageHeader";
import { DetailedCashFlowRecord } from "./types";

interface BudgetMainPageProp {
    allDetailedCashFlow: DetailedCashFlowRecord[]
}

const BudgetMainPage = (
    {
        allDetailedCashFlow
    }: BudgetMainPageProp
) => {
    return (
        <>
        <BudgetMainPageHeader />
        </>
    )
}

export default BudgetMainPage;