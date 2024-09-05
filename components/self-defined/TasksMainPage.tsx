'use client';

import { UrgentTasks, DetailedNote } from "./types";
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