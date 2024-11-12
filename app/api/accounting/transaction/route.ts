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
            category: data.fields.category,
        };

        const creditRecord = {
            title: data.fields.title,
            value: value,
            type: CashFlowType.Credit,
            accountid: data.fields.from,
            category: data.fields.category,
        };

        const [debitResponse, creditResponse] = await db.$transaction(
            [
                db.cashFlow.create({ data: { ...debitRecord, belongToId: user.id } }),
                db.cashFlow.create({ data: { ...creditRecord, belongToId: user.id } }),
            ]
        );

        const transactionResponse = await db.transaction.create(
            {
                data: {
                    fromId: creditResponse.id,
                    toId: debitResponse.id,
                    remark: data.fields.remark,
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

export async function PATCH(req: Request) {
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

        const {id, ...data} = await req.json();

        const transactionResponse = await db.$transaction(async () => {
            console.log(data);
            
            // update cash flows first if needed
            await db.cashFlow.update({
                where: {
                    id: data.fromCash,
                },
                data: {
                    accountid: data.from,
                    category: data.category,
                    value: parseFloat(data.value) || 0,
                }
            });
            await db.cashFlow.update({
                where: {
                    id: data.toCash,
                },
                data: {
                    accountid: data.to,
                    category: data.category,
                    value: parseFloat(data.value) || 0,
                }
            });

            // updat other data of the transaction
            await db.transaction.update(
                {
                    where: {
                        id: id,
                    },
                    data: {
                        remark: data.remark,
                    }
                }
            )
        })

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