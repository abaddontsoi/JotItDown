import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log(data);

        const insertId = await db.contentBlock.create({
            data: data
        });

        return new NextResponse(JSON.stringify({
            message: 'OK',
            insertId: insertId
        }), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Failed'
        }), {
            status: 500
        })
    }
}

export async function PATCH(req: Request) {

}