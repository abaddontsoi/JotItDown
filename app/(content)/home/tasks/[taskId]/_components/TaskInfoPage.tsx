'use client';

import { useTaskInfo } from "@/app/contexts/taskinfo/TaskInfoContext";
import { DetailedTaskInfo, Modes } from "@/components/self-defined/types";
import { Button } from "@/components/ui/button";
import { TaskInfoStatus } from "@prisma/client";
import { Pen } from "lucide-react";
import TaskInfoDisplay from "./TaskInfoDisplay";
import TaskInfoForm from "@/components/self-defined/taskInfo/TaskInfoForm";

interface TaskInfoPageProps {
    task: DetailedTaskInfo;
}

export default function TaskInfoPage({
    task
}: TaskInfoPageProps) {

    // use context to set task
    const ctx = useTaskInfo();
    ctx.setTask(task);

    if (!ctx.task) {
        return (
            <div>
                Task not found
            </div>
        )
    }

    return (
        <div className="w-full">
            {
                ctx.mode == 'Close' && (
                    <TaskInfoDisplay task={ctx.task} />
                )
            }
            {
                ctx.mode == 'Edit' && (
                    <TaskInfoForm
                        mode={ctx.mode}
                        setTargetTaskInfo={ctx.setTask}
                        setMode={ctx.setMode}
                        existingTaskInfo={ctx.task}
                    />
                )
            }
        </div>
    );
}
