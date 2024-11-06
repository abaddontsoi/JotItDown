import { db } from "@/lib/db";
import { DetailedNote, PromiseDetailedNotes, PromiseUrgentTasks, DetailedTaskInfo } from "@/components/self-defined/types";
import TasksMainPage from "@/components/self-defined/TasksMainPage";
import { TaskInfoStatus } from "@prisma/client";
import { Suspense } from "react";
import TaskMainPageContainer from "@/components/self-defined/TaskMainPageContainer";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "@/lib/getUser";
import Link from "next/link";


const TasksPage = async () => {
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>
                    Sign in
                </Link>
            </>
        )
    }

    const allNotes: PromiseDetailedNotes = db.note.findMany({
        where: {
            belongToId: user.id
        },
        include: {
            category: true,
            parentNote: {
                include: {
                    category: true,
                }
            },
            childrenNotes: {
                include: {
                    category: true,
                }
            },
            contentBlocks: {
                include: {
                    taskInfo: true
                }
            }
        }
    });

    const tasks = db.taskInfo.findMany({
        orderBy: {
            deadline: 'asc'
        },
        where: {
            belongToId: user.id,
        },
        include: {
            parentContentBlock: {
                include: {
                    parentNote: true,
                }
            }
        },
    });

    const fiveMostUrgentTaskInfo: PromiseUrgentTasks = db.taskInfo.findMany({
        orderBy: {
            // sort by ascending date
            deadline: 'asc'
        },
        where: {
            belongToId: user.id,
            deadline: {
                gt: new Date()
            },
            status: {
                not: TaskInfoStatus.Done,
            },
        },
        include: {
            parentContentBlock: {
                include: {
                    parentNote: true,
                }
            }
        },
        take: 5,
    });

    const overduedTasksInfo = db.taskInfo.findMany({
        orderBy: {
            // sort by ascending date
            deadline: 'asc'
        },
        where: {
            belongToId: user.id,
            deadline: {
                lt: new Date()
            },
            status: {
                not: TaskInfoStatus.Done
            }
        },
        include: {
            parentContentBlock: {
                include: {
                    parentNote: true,
                }
            }
        },
    });


    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <TaskMainPageContainer
                    allNotes={allNotes}
                    allTasks={tasks}
                    fiveMostUrgentTaskInfo={fiveMostUrgentTaskInfo}
                    overduedTasksInfo={overduedTasksInfo}
                />
            </Suspense>
            <Toaster />
        </>
    )
}

export const dynamic = 'force-dynamic';

export default TasksPage;