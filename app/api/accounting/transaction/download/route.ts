import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const data = await req.json();
        const { startDate, endDate, fromAccountId, toAccountId } = data;

        // Fetch transactions
        const transactions = await db.transaction.findMany({
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
            where: {
                belongToId: user.id,
                ...(startDate && { createdAt: { gte: new Date(startDate) } }),
                ...(endDate && { createdAt: { lte: new Date(endDate) } }),
                ...(fromAccountId && { from: { accountid: fromAccountId } }),
                ...(toAccountId && { to: { accountid: toAccountId } }),
            },
            orderBy: { createdAt: 'desc' }
        });

        const csvContent = [
            ["Date", "From Account", "To Account", "Amount", "Remark"].join(","),
            ...transactions.map(t => [
                t.createdAt,
                t.from.account?.title || 'Unknown',
                t.to.account?.title || 'Unknown',
                t.from.value,
                (t.remark || '').replace(/[\n\r]+/g, ' ')
            ].join(","))
        ].join("\n");

        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=TransactionsLog.csv'
            }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Error' }), { status: 500 });
    }
} 