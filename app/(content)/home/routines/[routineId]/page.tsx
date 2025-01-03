import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import RoutinePageContainer from "./_components/RoutinePageContainer";
import { Suspense } from "react";

export default async function RoutinePage({ params }: { params: { routineId: string } }) {
    const routine = await db.routine.findUnique({
        where: {
            id: params.routineId,
        },
        include: {
            RoutineCheckRecord: {
                include: {
                    checkBy: true,
                }
            },
        }
    });

    if (!routine) {
        return redirect("/home/routine");
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RoutinePageContainer routine={routine} />
        </Suspense>
    );
}

export const dynamic = 'force-dynamic';