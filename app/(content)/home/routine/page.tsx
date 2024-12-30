import { RoutineProvider, useRoutineContext } from "@/app/contexts/routine/RoutineContext";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";

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

    const ctx = useRoutineContext();
    ctx.routines = routines;

    return (
        <RoutineProvider>
            <div>
                <h1>{ctx.pageTitle}</h1>


            </div>
        </RoutineProvider>
    );
}
