import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();

        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'Unauthorized',
            }), {
                status: 401,
            })
        }

        const data = await req.json();
        
        // Ensure boolean fields are properly typed
        const accountData = {
            ...data,
            belongToId: user.id,
            isPersonalSpending: Boolean(data.isPersonalSpending),
            isIncomeSource: Boolean(data.isIncomeSource),
            originalCapital: data.originalCapital ? Number(data.originalCapital) : null,
        };

        const insertedAccount = await db.itemAccount.create({
            data: accountData
        });

        return new NextResponse(JSON.stringify({
            message: 'OK',
            account: insertedAccount
        }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Error',
            error: error instanceof Error ? error.message : 'Unknown error'
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
            }), {
                status: 401,
            })
        }

        const data = await req.json();
        const { id, ...updateData } = data;

        // Ensure boolean fields are properly typed
        const accountData = {
            ...updateData,
            isPersonalSpending: Boolean(updateData.isPersonalSpending),
            isIncomeSource: Boolean(updateData.isIncomeSource),
            originalCapital: updateData.originalCapital ? Number(updateData.originalCapital) : null,
        };

        const updatedAccount = await db.itemAccount.update({
            where: { id },
            data: accountData,
        });

        return new NextResponse(JSON.stringify({
            message: 'OK',
            account: updatedAccount
        }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Error',
            error: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
        });
    }
}