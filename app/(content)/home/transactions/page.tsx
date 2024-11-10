import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import TransactionsPageContainer from "@/components/self-defined/TransactionsPageContainer";
import { PromiseDetailedTransaction } from "@/components/self-defined/types";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser"
import { ItemAccount } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

export default async function Transactions() {
    const user = await getUser();

    const transactions: PromiseDetailedTransaction = db.transaction.findMany(
        {
            include: {
                from: {
                    include: {
                        account: true,
                    },
                },
                to: {
                    include: {
                        account: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        }
    )

    const ItemAccounts: Promise<ItemAccount[]> = db.ItemAccount.findMany();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>log in</Link>
            </>
        )
    }
    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <TransactionsPageContainer
                    transactions={transactions}
                    accounts={ItemAccounts}
                />
            </Suspense>
        </>
    )
}