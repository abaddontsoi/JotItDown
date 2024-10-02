import BudgetMainPageContainer from "@/components/self-defined/BudgetMainPageContainer";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import { PromiseDetailedAccountRecords, PromiseDetailedCashFlowRecords } from "@/components/self-defined/types";
import { Toaster } from "@/components/ui/toaster";
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
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    const allAccountsRecords: PromiseDetailedAccountRecords = db.account.findMany({
        include: {
            CashFlow: {
                include: {
                    CashFlowMtoMCategory: {
                        include: {
                            cashFlowCategory: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    })

    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <BudgetMainPageContainer
                    allDetailedCashFlow={allDetailedCashFlow}
                    allAccountsRecords={allAccountsRecords}
                />
            </Suspense>
            <Toaster />
        </>
    )
}

export const dynamic='force-dynamic';

export default BudgetPage;