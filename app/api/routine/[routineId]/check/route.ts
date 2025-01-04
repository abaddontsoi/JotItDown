import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { routineId: string } }
) {
    try {
        const user = await getUser();
        
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Verify routine belongs to user
        const routine = await db.routine.findFirst({
            where: {
                id: params.routineId,
                belongToId: user.id
            },
            include: {
                RoutineCheckRecord: {
                    orderBy: {
                        checkAt: 'desc'
                    },
                    take: 1
                }
            }
        });

        if (!routine) {
            return new NextResponse("Routine not found", { status: 404 });
        }

        // Verify routine is within valid period
        const now = new Date();
        if (routine.startDate > now || (routine.endDate && routine.endDate < now)) {
            return new NextResponse("Routine is not active", { status: 400 });
        }

        // Verify routine hasn't met target count
        if (routine.targetCount) {
            const checkCount = await db.routineCheckRecord.count({
                where: {
                    routineId: routine.id
                }
            });
            if (checkCount >= routine.targetCount) {
                return new NextResponse("Routine target count reached", { status: 400 });
            }
        }

        // Verify interval requirement
        const lastRecord = routine.RoutineCheckRecord[0];
        if (lastRecord) {
            const lastCheckDate = new Date(lastRecord.checkAt);
            const dayDifference = (now.getTime() / (1000 * 60 * 60 * 24) - lastCheckDate.getTime() / (1000 * 60 * 60 * 24));
            if (!routine.intervalInDays || dayDifference < routine.intervalInDays) {
                return new NextResponse("Interval requirement not met", { status: 400 });
            }
        }

        // Create check record
        const checkRecord = await db.routineCheckRecord.create({
            data: {
                routineId: routine.id,
                checkById: user.id,
                checkAt: now
            }
        });

        return NextResponse.json(checkRecord);

    } catch (error) {
        console.error("[ROUTINE_CHECK_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { routineId: string } }
) {
    try {
        const user = await getUser();
        
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const records = await db.routineCheckRecord.findMany({
            where: {
                routineId: params.routineId,
                routine: {
                    belongToId: user.id
                }
            },
            orderBy: {
                checkAt: 'desc'
            }
        });

        return NextResponse.json(records);

    } catch (error) {
        console.error("[ROUTINE_CHECK_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 