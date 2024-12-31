import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const routineSchema = z.object({
    routines: z.array(
        z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string(),
            startDate: z.date().or(z.string()),
            endDate: z.date().or(z.string()).optional(),
            targetCount: z.number().optional(),
            intervalInDays: z.number().min(1, "Interval must be at least 1").default(1),
        })
    )
    .min(1, "At least one routine is required")
    .max(5, "At most 5 routines are allowed"),
});

export async function POST(req: NextRequest) {
    try {
        const user = await getUser();
        
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const validatedData = routineSchema.parse(body);

        // Create all routines in a transaction
        const result = await db.$transaction(async (tx) => {
            const createdRoutines = await Promise.all(
                validatedData.routines.map(async (routine) => {
                    return await tx.routine.create({
                        data: {
                            title: routine.title,
                            description: routine.description,
                            startDate: routine.startDate,
                            endDate: routine.endDate,
                            targetCount: routine.targetCount || 1,
                            intervalInDays: routine.intervalInDays,
                            belongToId: user.id,
                        }
                    });
                })
            );

            return createdRoutines;
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error("[ROUTINE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const user = await getUser();
        
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const routines = await db.routine.findMany({
            where: {
                belongToId: user.id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(routines);

    } catch (error) {
        console.error("[ROUTINE_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 