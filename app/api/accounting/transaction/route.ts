import { db } from "@/lib/db";
import { CashFlowType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log(data);

        const {value, ...fields} = data;

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
                db.cashFlow.create({data: debitRecord}),
                db.cashFlow.create({data: creditRecord}),
            ]
        );

        const transactionResponse = await db.transaction.create(
            {
                data: {
                    fromId: creditResponse.id,
                    toId: debitResponse.id,
                    remark: data.remark,
                }
            }
        )

        return  new NextResponse(JSON.stringify({
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