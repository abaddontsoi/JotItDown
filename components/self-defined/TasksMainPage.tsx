'use client';

import { Suspense } from "react";
import { UrgentTasks, DetailedNote, OverduedTasksInfo } from "./types";
import UrgentTasksContextCard from "./UrgentTasksContextCard";
import ContextCardFallBack from "./ContextCardFallBack";

interface TasksMainPageProp {
    allNotes: DetailedNote[],
    fiveMostUrgentTaskInfo: UrgentTasks[],
    overduedTasksInfo?: OverduedTasksInfo[]
}

const TasksMainPage = (
    { allNotes, fiveMostUrgentTaskInfo }: TasksMainPageProp
) => {
    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <UrgentTasksContextCard allNotes={allNotes} urgentTasks={fiveMostUrgentTaskInfo} />
            </Suspense>
        </>
    )
}

export default TasksMainPage;