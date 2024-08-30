import { db } from "@/lib/db";
import { TaskInfoStatus } from "@prisma/client";
import NotesMainPage from "./_components/NotesMainPage";

const NotesPage = async () => {
    const allNotes = await db.note.findMany();

    const fiveMostUrgentTaskInfo = await db.taskInfo.findMany({
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
    })
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
    console.log(overduedTasksInfo);

    return (
        <>
            <NotesMainPage allNotes={allNotes} fiveMostUrgentTaskInfo={fiveMostUrgentTaskInfo}/>
        </>
    )
}

export default NotesPage;