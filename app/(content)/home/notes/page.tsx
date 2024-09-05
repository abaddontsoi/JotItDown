import { db } from "@/lib/db";
import { TaskInfoStatus } from "@prisma/client";
import NotesMainPage from "../../../../components/self-defined/NotesMainPage";
import { DetailedNote, UrgentTasks } from "../../../../components/self-defined/types";

const NotesPage = async () => {
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
            <NotesMainPage allNotes={allNotes}/>
        </>
    )
}

export default NotesPage;