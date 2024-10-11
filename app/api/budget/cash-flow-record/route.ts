import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();

        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'Unauthorized'
            }), { status: 401 });
        }

        const value = await req.json();

        const response = await db.cashFlow.create({
            data: {
                title: value.title,
                value: parseFloat(value.value),
                description: value.description,
                type: value.type,
                category: value.category,
                belongToId: user.id,
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