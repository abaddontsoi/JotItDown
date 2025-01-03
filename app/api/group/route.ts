import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser"
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
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

        const transaction = await db.$transaction(async (dx) => {
            const createResponse = await db.group.create({
                data: { ...data, updatedById: user.id },
            });
    
            const createGroup = await db.groupUser.create({
                data: {
                    groupId: createResponse.id,
                    userId: user.id,
                }
            });
        })


        return new NextResponse(
            JSON.stringify({
                message: 'OK',
                extraInfo: transaction,
            }),
            {
                status: 200,
            }
        );

    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                error: 'Error'
            }),
            {
                status: 500,
            }
        )
    }
}

export const PATCH = async (req: Request) => {
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

        const {id, ...others} = data;

        const createResponse = await db.group.update({
            where: {
                id: id,
            },
            data: { ...others, updatedById: user.id },
        });

        return new NextResponse(
            JSON.stringify({
                message: 'OK'
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);

        return new NextResponse(
            JSON.stringify({
                message: 'Error'
            }),
            {
                status: 500,
            }
        );

    }
}