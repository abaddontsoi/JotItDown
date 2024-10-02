import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const value = await req.json();

        console.dir(value);

        const response = await db.cashFlow.create({
            data: {
                title: value.title,
                value: parseFloat(value.value),
                description: value.description,
                type: value.type,
                category: value.category,
                isLongTermUsage: value.isLongTermUsage,
            }
        })

        return new NextResponse(JSON.stringify({
            message: 'OK',
            extraInfo: response,
        }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Error'
        }), { status: 500 });
    }
}