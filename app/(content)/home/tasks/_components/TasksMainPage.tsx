'use client';

import { DetailedNote } from "../../notes/_components/types";
import { UrgentTasks } from "./types";
import UrgentTasksContextCard from "./UrgentTasksContextCard";

const TasksMainPage = (
    {allNotes, fiveMostUrgentTaskInfo}: {
        allNotes: DetailedNote[],
        fiveMostUrgentTaskInfo: UrgentTasks[],
        }
) => {
    return (
        <>
            <UrgentTasksContextCard allNotes={allNotes} urgentTasks={fiveMostUrgentTaskInfo} />
        </>
    )
}

export default TasksMainPage;