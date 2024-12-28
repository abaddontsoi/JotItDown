'use client';

import { Suspense, useState } from "react";
import { DetailedTaskInfo, DetailedNote, OverduedTasksInfo } from "./types";
import UrgentTasksContextCard from "./UrgentTasksContextCard";
import ContextCardFallBack from "./ContextCardFallBack";
import TaskInfoViewModeDialog from "./TaskInfoViewModeDialog";
import AllTasksContextCard from "./AllTasksContextCard";
import TasksMainPageHeader from "@/app/(content)/home/tasks/_components/TasksMainPageHeader";
import { useRouter } from "next/navigation";
import TaskInfoDialog from "./TaskInfoDialog";

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
    const router = useRouter();
    const [viewMode, setViewMode] = useState<boolean>(false);
    const [taskInfoInView, setTaskInfoInView] = useState<DetailedTaskInfo | undefined>();
    const [taskDialogMode, setTaskDialogMode] = useState<'Create' | 'Edit' | 'Close'>('Close');

    const handleAddOneTask = () => {       
        setTaskInfoInView(undefined);
        setTaskDialogMode('Create');
    }

    const handleAddMultipleTasks = () => {
        router.push('/home/tasks/create');
    }

    return (
        <>
            {/* read mode dialog for task */}
            {/* or additionally add a state changing button */}
            <TaskInfoViewModeDialog
                task={taskInfoInView}
                setTaskInfoInView={setTaskInfoInView}
            />
            <TaskInfoDialog
                mode={taskDialogMode}
                setTargetTaskInfo={setTaskInfoInView}
                setMode={setTaskDialogMode}
            />

            <TasksMainPageHeader
                onAddOneTask={handleAddOneTask}
                onAddMultipleTasks={handleAddMultipleTasks}
            />
            <div className="flex flex-col gap-2 px-[40px]">
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
                        setTaskInfoInView={setTaskInfoInView}
                    />
                </Suspense>
            </div>
        </>
    )
}

export default TasksMainPage;