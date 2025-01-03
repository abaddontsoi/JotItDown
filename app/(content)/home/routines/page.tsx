import { RoutineProvider, useRoutineContext } from "@/app/contexts/routines/RoutinesContext";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import RoutinesContainer from "./_components/RoutinesContainer";

export default async function RoutinePage() {
    const user = await getUser();

    if (!user) {
        return redirect("/login");
    }

    const routines = await db.routine.findMany({
        where: {
            belongToId: user.id,
        },
        include: {
            RoutineCheckRecord: {
                include: {
                    checkBy: true,
                }
            },
        },
    });

    return (
        <RoutinesContainer routines={routines} />
    );
}

export const dynamic = 'force-dynamic';