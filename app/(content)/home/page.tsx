import { getUser } from "@/lib/getUser";
import Link from "next/link";
import { db } from "@/lib/db";
import { Suspense } from "react";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import DashboardContainer from "@/components/self-defined/DashboardContainer";
import { startOfMonth, endOfMonth } from "date-fns";

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>Sign in</Link>
            </>
        )
    }

    // Get recent notes
    const recentNotes = db.note.findMany({
        where: {
            belongToId: user.id,
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: 5,
        include: {
            category: true,
            contentBlocks: {
                include: {
                    taskInfo: true
                }
            }
        }
    });

    // Get upcoming tasks
    const upcomingTasks = db.taskInfo.findMany({
        where: {
            belongToId: user.id,
            deadline: {
                gte: new Date()
            },
            status: {
                not: 'Done'
            }
        },
        orderBy: {
            deadline: 'asc'
        },
        take: 5,
        include: {
            parentContentBlock: {
                include: {
                    parentNote: true
                }
            }
        }
    });

    // Get recent transactions and monthly expenses with await
    const recentTransactions = db.transaction.findMany({
        where: {
            belongToId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 5,
        include: {
            from: {
                include: {
                    account: true
                }
            },
            to: {
                include: {
                    account: true
                }
            }
        }
    });

    const monthlyExpenses = db.transaction.findMany({
        where: {
            belongToId: user.id,
            createdAt: {
                gte: startOfMonth(new Date()),
                lte: endOfMonth(new Date())
            }
        },
        include: {
            from: {
                include: {
                    account: true
                }
            },
            to: {
                include: {
                    account: true
                }
            }
        }
    });

    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <DashboardContainer 
                recentNotes={recentNotes}
                upcomingTasks={upcomingTasks}
                recentTransactions={recentTransactions}
                monthlyExpenses={monthlyExpenses}
            />
        </Suspense>
    )
}

export const dynamic = 'force-dynamic';