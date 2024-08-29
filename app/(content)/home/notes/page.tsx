import { db } from "@/lib/db";
import UrgentTasksCard from "./_components/UrgentTasksCard";

const NotesPage = async () => {
    const fiveMostUrgentTaskInfo = await db.taskInfo.findMany({
        orderBy: {
            // sort by ascending date
            deadline: 'asc'
        },
        take: 5,
    })

    

    return (
        <div>
            Notes

            {/* First list out 5 most urgent tasks */}
            <UrgentTasksCard urgentTasks={fiveMostUrgentTaskInfo} />
        </div>
    )
}

export default NotesPage;