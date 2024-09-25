'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DetailedCashFlowRecord } from "./types";

interface BudgetSummaryThisMonthProp {
    thisMonthDetailedCashFlow:  DetailedCashFlowRecord[]
}


const BudgetSummaryThisMonth = (
    {
        thisMonthDetailedCashFlow
    }: BudgetSummaryThisMonthProp
) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        This month's in/out
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </>
    )
}

export default BudgetSummaryThisMonth;