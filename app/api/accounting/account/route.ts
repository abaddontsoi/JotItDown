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

        const insertId = await db.itemAccount.create({
            data: {...data, belongToId: user.id}
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

        const data = await req.json();

        const {id, ...others} = data;

        const updateId = await db.itemAccount.update({
            where: {
                id: id
            }, 
            data: others,
        })

        return  new NextResponse(JSON.stringify({
            message: 'OK',
            extraInfo: updateId
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