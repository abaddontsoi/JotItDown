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

        const createResponse = await db.group.create({
            data: { ...data, updatedById: user.id },
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

    }
}