import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { CashFlowType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();

        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'Unauthorized',
                // extraInfo: transactionResponse
            }), {
                status: 401,
            })

        }

        const data = await req.json();

        const { value, ...fields } = data;

        const debitRecord = {
            title: data.fields.title,
            value: value,
            type: CashFlowType.Debit,
            accountid: data.fields.to,
        };

        const creditRecord = {
            title: data.fields.title,
            value: value,
            type: CashFlowType.Credit,
            accountid: data.fields.from,
        };

        const [debitResponse, creditResponse] = await db.$transaction(
            [
                db.cashFlow.create({ data: { ...debitRecord, belongToId: "" } }),
                db.cashFlow.create({ data: { ...creditRecord, belongToId: "" } }),
            ]
        );

        const transactionResponse = await db.transaction.create(
            {
                data: {
                    fromId: creditResponse.id,
                    toId: debitResponse.id,
                    remark: data.remark,
                    belongToId: user.id, 
                }
            }
        )

        return new NextResponse(JSON.stringify({
            message: 'OK',
            extraInfo: transactionResponse
        }), {
            status: 200,
        })
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify({
            message: 'Error',
        }), {
            status: 500,
        });
    }
}