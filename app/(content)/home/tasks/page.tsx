import { db } from "@/lib/db";
import TasksMainPage from "./_components/TasksMainPage"
import { DetailedNote, UrgentTasks } from "./_components/types"

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

    return (
        <>
            <TasksMainPage allNotes={allNotes} fiveMostUrgentTaskInfo={fiveMostUrgentTaskInfo}></TasksMainPage>
        </>
    )
}

export default TasksPage;