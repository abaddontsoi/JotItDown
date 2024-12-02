import { StatisticsProvider } from "@/app/contexts/statistics/StatisticsContext";
import { getUser } from "@/lib/getUser"
import Link from "next/link";
import { Suspense } from "react";
import StatisticsPageContainer from "../../_components/StatisticsPageContainer";
import { db } from "@/lib/db";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";

export default async function StatisticsByYearMonth({ params }: { params: { year: string, month: string } }) {
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>Sign in</Link>
            </>
        )
    }

    const startDate = new Date(`${params.year}-${params.month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    const transactions = db.transaction.findMany({
        where: {
            belongToId: user.id,
            OR: [
                {
                    recordDate: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                {
                    AND: [
                        { recordDate: null },
                        {
                            createdAt: {
                                gte: startDate,
                                lte: endDate
                            }
                        }
                    ]
                }
            ]
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
                    year={parseInt(params.year)}
                    month={parseInt(params.month)}
                />
            </Suspense>
        </StatisticsProvider>
    )
}

export const dynamic = 'force-dynamic';