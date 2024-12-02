import { StatisticsProvider } from "@/app/contexts/statistics/StatisticsContext";
import { getUser } from "@/lib/getUser"
import Link from "next/link";
import { Suspense } from "react";
import StatisticsPageContainer from "../_components/StatisticsPageContainer";
import { db } from "@/lib/db";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";

export default async function MonthlyStatistics() {
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>Sign in</Link>
            </>
        )
    }

    // Get current month's start and end dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = db.transaction.findMany({
        where: {
            belongToId: user.id,
            // createdAt: {
            //     gte: startOfMonth,
            //     lte: endOfMonth
            // }
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
                    year={now.getFullYear()}
                    month={now.getMonth() + 1}
                />
            </Suspense>
        </StatisticsProvider>
    )
} 

export const dynamic = 'force-dynamic'; 