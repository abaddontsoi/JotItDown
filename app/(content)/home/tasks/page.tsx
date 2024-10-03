import { db } from "@/lib/db";
import { DetailedNote, PromiseDetailedNotes, PromiseUrgentTasks, UrgentTasks } from "@/components/self-defined/types";
import TasksMainPage from "@/components/self-defined/TasksMainPage";
import { TaskInfoStatus } from "@prisma/client";
import { Suspense } from "react";
import TaskMainPageContainer from "@/components/self-defined/TaskMainPageContainer";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";


const TasksPage = async () => {
    const allNotes: PromiseDetailedNotes = db.note.findMany({
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

    const fiveMostUrgentTaskInfo: PromiseUrgentTasks = db.taskInfo.findMany({
        orderBy: {
            // sort by ascending date
            deadline: 'asc'
        },
        where: {
            deadline: {
                gt: new Date()
            },
            status: {
                not: TaskInfoStatus.Done,
            }
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
                <TaskMainPageContainer allNotes={allNotes} 
                fiveMostUrgentTaskInfo={fiveMostUrgentTaskInfo} 
                overduedTasksInfo={overduedTasksInfo} />
            </Suspense>
        </>
    )
}

export default TasksPage;