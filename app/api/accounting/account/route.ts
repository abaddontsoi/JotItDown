import { db } from "@/lib/db";
import { CashFlowType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const insertId = await db.account.create({
            data: data
        })

        return  new NextResponse(JSON.stringify({
            message: 'OK',
            // extraInfo: transactionResponse
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