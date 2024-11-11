import { StatisticsProvider, useStatistics } from "@/app/contexts/statistics/StatisticsContext";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import { getUser } from "@/lib/getUser"
import Link from "next/link";
import { Suspense } from "react";
import StatisticsPageContainer from "./_components/StatisticsPageContainer";
import { db } from "@/lib/db";

export default async function Statistics() {
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

    const transactions = db.transaction.findMany(
        {
            include: {
                from: {
                    include: {
                        account: true,
                    }
                },
                to: {
                    include: {
                        account: true,
                    }
                },
            }
        }
    );

    return (
        <StatisticsProvider>
            <Suspense fallback={<ContextCardFallBack />}>
                {/* Page */}
                <StatisticsPageContainer
                    transactions={transactions}
                />
            </Suspense>
        </StatisticsProvider>
    )
}