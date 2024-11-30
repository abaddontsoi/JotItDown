import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { CashFlowType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const data = await req.json();
        const { value, fields } = data;

        const debitRecord = {
            title: fields.title,
            value: value,
            type: CashFlowType.Debit,
            accountid: fields.to,
            category: fields.category,
        };

        const creditRecord = {
            title: fields.title,
            value: value,
            type: CashFlowType.Credit,
            accountid: fields.from,
            category: fields.category,
        };

        const [debitResponse, creditResponse] = await db.$transaction([
            db.cashFlow.create({ data: { ...debitRecord, belongToId: user.id } }),
            db.cashFlow.create({ data: { ...creditRecord, belongToId: user.id } }),
        ]);

        const transactionResponse = await db.transaction.create({
            data: {
                fromId: creditResponse.id,
                toId: debitResponse.id,
                remark: fields.remark,
                belongToId: user.id,
                recordDate: fields.recordDate ? new Date(fields.recordDate) : null,
            }
        });

        return new NextResponse(JSON.stringify({
            message: 'OK',
            extraInfo: transactionResponse
        }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: 'Error' }), { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const { id, ...data } = await req.json();

        const transactionResponse = await db.$transaction(async () => {
            // Update cash flows
            await db.cashFlow.update({
                where: { id: data.fromCash },
                data: {
                    accountid: data.from,
                    category: data.category,
                    value: parseFloat(data.value) || 0,
                    title: data.title,
                }
            });
            await db.cashFlow.update({
                where: { id: data.toCash },
                data: {
                    accountid: data.to,
                    category: data.category,
                    value: parseFloat(data.value) || 0,
                    title: data.title,
                }
            });

            // Update transaction
            return db.transaction.update({
                where: { id },
                data: {
                    remark: data.remark,
                    recordDate: data.recordDate ? new Date(data.recordDate) : null,
                }
            });
        });

        return new NextResponse(JSON.stringify({
            message: 'OK',
            extraInfo: transactionResponse
        }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: 'Error' }), { status: 500 });
    }
}

export async function DELETE(req: Request) {
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

        const deleteId = await db.transaction.delete(
            {
                where: {
                    id: data.id || null
                }
            }
        )
        return new NextResponse(JSON.stringify({
            message: 'OK',
            extraInfo: deleteId
        }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify({
            message: 'Error',
        }), {
            status: 500,
        });
    }
}