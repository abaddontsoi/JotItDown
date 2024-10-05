'use client';

import { Suspense, useState } from "react";
import { DetailedTaskInfo, DetailedNote, OverduedTasksInfo } from "./types";
import UrgentTasksContextCard from "./UrgentTasksContextCard";
import ContextCardFallBack from "./ContextCardFallBack";
import TaskInfoViewModeDialog from "./TaskInfoViewModeDialog";
import { TaskInfo } from "@prisma/client";

interface TasksMainPageProp {
    allNotes: DetailedNote[],
    fiveMostUrgentTaskInfo: DetailedTaskInfo[],
    overduedTasksInfo?: OverduedTasksInfo[]
}

const TasksMainPage = (
    { allNotes, fiveMostUrgentTaskInfo }: TasksMainPageProp
) => {
    const [viewMode, setViewMode] = useState<boolean>(false);
    const [taskInfoInView, setTaskInfoInView] = useState<DetailedTaskInfo | undefined>();

    return (
        <>
            {/* read mode dialog for task */}
            {/* or additionally add a state changing button */}
            <TaskInfoViewModeDialog 
            task={taskInfoInView} 
            setTaskInfoInView={setTaskInfoInView}            
            />

            <Suspense fallback={<ContextCardFallBack />}>
                <UrgentTasksContextCard
                    allNotes={allNotes}
                    urgentTasks={fiveMostUrgentTaskInfo}
                    setViewMode={() => setViewMode(!viewMode)}
                    setTaskInfoInView={setTaskInfoInView}
                />
            </Suspense>
        </>
    )
}

export default TasksMainPage;