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
    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>sign in</Link>
            </>
        )
    }

    const transactions: PromiseDetailedTransaction = db.transaction.findMany(
        {
            where: {
                belongToId: user.id
            },
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
        }
    )

    const itemAccounts: Promise<ItemAccount[]> = db.itemAccount.findMany();

    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <TransactionsPageContainer
                    transactions={transactions}
                    accounts={itemAccounts}
                />
            </Suspense>
        </>
    )
}

export const dynamic = "force-dynamic";