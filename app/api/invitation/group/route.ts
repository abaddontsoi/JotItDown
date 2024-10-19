import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
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

        // data will be {id: string, isAccept: boolean}
        const data = await req.json();

        const update = await db.$transaction(async (tx) => {
            // update the invitation to read
            const invitationUpdate = await tx.invitation.update(
                {
                    where: {
                        id: data.id || null,
                    },
                    data: {
                        read: true,
                    }
                }
            );

            if (data.isAccept == false) {
                return;
            }

            if (!invitationUpdate || invitationUpdate == null || invitationUpdate.groupId == null) {
                return new NextResponse(
                    JSON.stringify({
                        message: 'Bad request',
                    }),
                    {
                        status: 400,
                    }
                );        
            }


            // if (invitationUpdate.read)

            const target = await tx.user.findFirst(
                {
                    where: {
                        id: invitationUpdate.toid,
                    }
                }
            );

            if (!target) {
                return new NextResponse(
                    JSON.stringify({
                        message: 'Bad request',
                        // extraInfo: addGroup,
                    }),
                    {
                        status: 400,
                    }
                );        
            }

            // add to group
            return tx.groupUser.create({
                data: {
                    groupId: invitationUpdate?.groupId,
                    userId: target?.id,
                }
            });
        });

        return new NextResponse(
            JSON.stringify({
                message: 'OK',
                extraInfo: update,
            }),
            {
                status: 200,
            }
        );

    } catch (error) {
        console.log(error);
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