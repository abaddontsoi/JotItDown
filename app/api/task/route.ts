import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const value = await req.json();

        const insert = await db.taskInfo.create({
            data: value,
        })

        return new NextResponse(JSON.stringify({
            message: 'Success',
            insertId: insert,
        }), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Internal Error'
        }), {
            status: 500
        });
    }
}

export async function PATCH(req: Request) {
    try {


        const value = await req.json();
        return new NextResponse(JSON.stringify({
            message: 'Success'
        }), {
            status: 200
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Internal Error'
        }), {
            status: 500
        });
    }
}