import { StatisticsProvider } from "@/app/contexts/statistics/StatisticsContext";
import { getUser } from "@/lib/getUser"
import Link from "next/link";
import { Suspense } from "react";
import StatisticsPageContainer from "./_components/StatisticsPageContainer";
import { db } from "@/lib/db";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";

export default async function Statistics() {
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>Sign in</Link>
            </>
        )
    }

    const transactions = db.transaction.findMany({
        where: {
            belongToId: user.id,
        },
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
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <StatisticsProvider>
            <Suspense fallback={<ContextCardFallBack />}>
                <StatisticsPageContainer
                    transactions={transactions}
                    overall={true}
                />
            </Suspense>
        </StatisticsProvider>
    )
}