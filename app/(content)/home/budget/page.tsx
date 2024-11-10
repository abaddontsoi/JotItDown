import BudgetMainPageContainer from "@/components/self-defined/BudgetMainPageContainer";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import { PromiseDetailedAccountRecords, PromiseDetailedCashFlowRecords } from "@/components/self-defined/types";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import Link from "next/link";
import { Suspense } from "react";

const BudgetPage = async () => {

    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>
                    Sign in
                </Link>
            </>
        )
    }


    const allDetailedCashFlow: PromiseDetailedCashFlowRecords = db.cashFlow.findMany({
        where: {
            belongToId: user.id,
        },
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

    const allAccountsRecords: PromiseDetailedAccountRecords = db.itemAccount.findMany({
        where: {
            belongToId: user.id,
        },
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