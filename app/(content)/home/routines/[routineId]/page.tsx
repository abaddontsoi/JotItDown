import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function RoutinePage({ params }: { params: { routineId: string } }) {
    const routine = await db.routine.findUnique({
        where: {
            id: params.routineId,
        },
    });

    if (!routine) {
        return redirect("/home/routine");
    }

    return (
        <div>
            <h1>{routine.title}</h1>
        </div>
    );
}