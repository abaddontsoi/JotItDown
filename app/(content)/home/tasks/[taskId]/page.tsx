import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack"
import { db } from "@/lib/db"
import { getUser } from "@/lib/getUser"
import { Suspense } from "react"
import TaskInfoPageContainer from "./_components/TaskInfoPageContainer"
import Link from "next/link"

export default async function Task({
    params
}: {
    params: {
        taskId: string
    }
}) {
    const user = await getUser();
    
    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>Sign in</Link>
            </>
        )
    }

    const task = db.taskInfo.findFirst({
        where: {
            id: params.taskId,
            OR: [
                { belongToId: user.id },
                {
                    group: {
                        GroupUser: {
                            some: {
                                userId: user.id
                            }
                        }
                    }
                }
            ]
        },
        include: {
            parentContentBlock: {
                include: {
                    parentNote: true,
                }
            },
            belongTo: true,
            group: true,
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