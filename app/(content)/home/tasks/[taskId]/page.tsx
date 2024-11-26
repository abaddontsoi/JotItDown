import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack"
import { db } from "@/lib/db"
import { getUser } from "@/lib/getUser"
import { Suspense } from "react"
import TaskInfoPageContainer from "./_components/TaskInfoPageContainer"

export default async function Task({
    params
}: {
    params: {
        taskId: string
    }
}) {
    const user = getUser();
    if (!user) {
        return null;
    }

    const task = db.taskInfo.findFirst({
        where: {
            id: params.taskId,
        },
        include: {
            parentContentBlock: {
                include: {
                    parentNote: true,
                }
            }
        }
    })

    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <TaskInfoPageContainer task={task} />
            </Suspense>
        </>
    )
}