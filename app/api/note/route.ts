import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const insertNoteId = await db.note.create({
            data: data.basic,
        })

        if (data.extra?.category) {
            const found = await db.category.findFirst({
                where: {
                    name: data.extra?.category
                }
            });

            if (!found) {
                
            } else {
                const updateResponse = await db.note.update({
                    where: {
                        id: insertNoteId.id
                    },
                    data: {
                        categoryId: found.id
                    }
                });
            }
        }

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