import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { routineId: string } }) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { routineId } = params;
        const routine = await req.json();
        
        
        const updateId = await db.routine.update({
            where: {
                id: routineId,
            },
            data: routine,
        });

        return NextResponse.json({ message: 'Routine updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update routine' }, { status: 500 });
    }
}