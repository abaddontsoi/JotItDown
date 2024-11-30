import { db } from "@/lib/db";
import { DetailedTransaction } from "@/components/self-defined/types";

export async function getTransactions(): Promise<DetailedTransaction[]> {
    return db.transaction.findMany({
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
            }
        },
        orderBy: [
            { recordDate: 'desc' },
            { createdAt: 'desc' }
        ]
    });
} 