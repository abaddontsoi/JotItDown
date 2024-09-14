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
    try {
        const data = await req.json();
        console.log(data);

        const updateId = await db.contentBlock.update({
            where: {
                id: data.id,
            }, 
            data: {
                title: data.title,
                content: data.content,
                parentNoteId: data.parentNoteId
            }
        });
        return new NextResponse(JSON.stringify({
            message: 'OK',
            updateId: updateId
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

export async function DELETE(req: Request) {
    try {
        const data = await req.json();
        console.log(data);

        const deleteResponse = await db.contentBlock.delete({
            where: {
                id: data.target
            }
        });

        return new NextResponse(JSON.stringify({
            message: 'OK',
            deleteResponse: deleteResponse
        }), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Failed'
        }), {
            status: 500
        });
    }
}