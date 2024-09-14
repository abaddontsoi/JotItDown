import { db } from "@/lib/db";
import { DetailedNote, UrgentTasks } from "@/components/self-defined/types";
import TasksMainPage from "@/components/self-defined/TasksMainPage";
import { TaskInfoStatus } from "@prisma/client";


const TasksPage = async () => {
    const allNotes: DetailedNote[] = await db.note.findMany({
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

    const fiveMostUrgentTaskInfo: UrgentTasks[] = await db.taskInfo.findMany({
        orderBy: {
            // sort by ascending date
            deadline: 'asc'
        },
        where: {
            deadline: {
                gt: new Date()
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

    const overduedTasksInfo = await db.taskInfo.findMany({
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
            <TasksMainPage allNotes={allNotes} fiveMostUrgentTaskInfo={fiveMostUrgentTaskInfo}></TasksMainPage>
        </>
    )
}

export default TasksPage;