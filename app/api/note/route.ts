import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const insertNoteId = await db.note.create({
            data: data,
        })

        return new NextResponse(JSON.stringify({
            message: 'Note Created'
        }), {
            status: 200
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Failed'
        }), {
            status: 500
        })
    }
}

export async function PATCH(req: Request) {

}