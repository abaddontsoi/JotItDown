import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { InvitationType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();

        if (!user) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Not authorized'
                }),
                {
                    status: 401,
                }
            )
        }

        const data = await req.json();
        // console.log(data);
        // { id: '670ce39855af357f58229e0b', toEmail: 'adfs@apdf.com' }

        const target = await db.user.findFirstOrThrow({
            where: {
                email: data.toEmail,
            }
        });

        const response = await db.invitation.create({
            data: {
                fromid: user.id,
                toid: target.id,
                type: InvitationType.Group,
                groupId: data.id,
            }
        })

        return new NextResponse(
            JSON.stringify({
                message: 'Ok',
                extraInfo: response,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({
                message: 'Error',
            }),
            {
                status: 500,
            }
        );
    }
}