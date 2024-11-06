'use client';

import { Suspense, useState } from "react";
import { DetailedTaskInfo, DetailedNote, OverduedTasksInfo } from "./types";
import UrgentTasksContextCard from "./UrgentTasksContextCard";
import ContextCardFallBack from "./ContextCardFallBack";
import TaskInfoViewModeDialog from "./TaskInfoViewModeDialog";
import { TaskInfo } from "@prisma/client";
import AllTasksContextCard from "./AllTasksContextCard";

interface TasksMainPageProp {
    allNotes: DetailedNote[],
    allTasks: DetailedTaskInfo[],
    fiveMostUrgentTaskInfo: DetailedTaskInfo[],
    overduedTasksInfo?: OverduedTasksInfo[]
}

const TasksMainPage = (
    {
        allNotes,
        allTasks,
        fiveMostUrgentTaskInfo
    }: TasksMainPageProp
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

            <div className="flex flex-col gap-2">
                <Suspense fallback={<ContextCardFallBack />}>
                    <UrgentTasksContextCard
                        allNotes={allNotes}
                        urgentTasks={fiveMostUrgentTaskInfo}
                        setViewMode={() => setViewMode(!viewMode)}
                        setTaskInfoInView={setTaskInfoInView}
                    />
                </Suspense>

                <Suspense fallback={<ContextCardFallBack />}>
                    {/* <UrgentTasksContextCard
                        allNotes={allNotes}
                        urgentTasks={fiveMostUrgentTaskInfo}
                        setViewMode={() => setViewMode(!viewMode)}
                        setTaskInfoInView={setTaskInfoInView}
                    /> */}

                    {/* All tasks component, it contains filter */}
                    <AllTasksContextCard
                        tasks={allTasks}
                    />
                </Suspense>
            </div>
        </>
    )
}

export default TasksMainPage;