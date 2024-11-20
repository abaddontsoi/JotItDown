import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const user = await getUser();

        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'Unauthorized'
            }), {
                status: 401
            });
        }

        const data = await req.json();
        const { id, ...values } = data;
        const update = await db.note.update({
            where: {
                id: id,
            },
            data: values
        });

        return new NextResponse(JSON.stringify({
            message: 'Note Shared',
            extraInfo: update
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