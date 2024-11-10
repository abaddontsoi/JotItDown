import { Suspense } from "react";
import { DetailedTransaction, PromiseDetailedTransaction } from "./types"
import ContextCardFallBack from "./ContextCardFallBack";
import TransactionsPage from "./TransactionsPage";
import { itemAccount } from "@prisma/client";

interface TransactionsPageContainerProp {
    transactions: PromiseDetailedTransaction;
    accounts: Promise<itemAccount[]>
}

export default async function TransactionsPageContainer(
    {
        transactions,
        accounts,
    }: TransactionsPageContainerProp
) {

    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <TransactionsPage
                    transactions={await transactions}
                    accounts={await accounts}
                />
            </Suspense>
        </>
    )
}