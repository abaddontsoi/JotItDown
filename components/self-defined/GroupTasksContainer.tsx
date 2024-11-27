'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import UrgentTasksContextCard from "./UrgentTasksContextCard";
import { DetailedTaskInfo, Modes } from "./types";
import TaskInfoDialog from "./TaskInfoDialog";
import { useState } from "react";
import GroupTaskInfoDialog from "./GroupTaskInfoDialog";
import TaskInfoViewModeDialog from "./TaskInfoViewModeDialog";
import { TaskInfoStatus } from "@prisma/client";

interface GroupTasksContainerProp {
    groupId: string;
    tasks: DetailedTaskInfo[];
}

export default function GroupTasksContainer(
    {
        groupId,
        tasks,
    }: GroupTasksContainerProp
) {
    const [mode, setMode] = useState<Modes>('Close');
    const [task, setTask] = useState<DetailedTaskInfo>();

    return (
        <>
            {/* Place Task Dialog Here */}
            <GroupTaskInfoDialog
                mode={mode}
                setTargetTaskInfo={setTask}
                groupId={groupId}
                setMode={setMode}
            />

            <TaskInfoViewModeDialog
                task={task}
                setTaskInfoInView={setTask}
            />

            <div className="flex items-center justify-between">
                <h2 className="text-2xl">Tasks</h2>

                <div>
                    <Button variant={'ghost'} type="button" className="flex gap-1 items-center"
                        onClick={() => {
                            setMode('Create');
                        }}
                    >
                        <Plus />
                        <p>
                            Tasks
                        </p>
                    </Button>
                </div>
            </div>

            {/* Display Group Tasks here */}
            <UrgentTasksContextCard
                urgentTasks={tasks.filter(task => task.status != TaskInfoStatus.Done)}
                setTaskInfoInView={setTask}
            />
        </>
    );
}